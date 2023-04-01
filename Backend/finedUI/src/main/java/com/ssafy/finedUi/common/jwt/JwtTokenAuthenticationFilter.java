package com.ssafy.finedUi.common.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.finedUi.common.BaseResponse;
import com.ssafy.finedUi.common.oauth.user.UserPrincipal;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.stream.Collectors;


//redirect시 security에서 필터 적용 안되도록 OncePerRequest 설정.
@Slf4j
public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";

    public static final String REFRESH_HEADER = "Refresh";

    @Autowired
    private TokenProvider tokenProvider;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

//       Header에서 accesstoken을 꺼냄.
        log.info("jwtFilter 진입 : ----------------------");
//        log.info("url : " + request.getRequestURL());
        String jwt = resolveAccessToken(request);
        String errorMsg = null;
        try {
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt, "access")) {
//            토큰이 있고 유효한경우.
                Authentication authentication = tokenProvider.getAuthentication(jwt);
//            jwt에 담긴 정보를 context에 저장.
                SecurityContextHolder.getContext().setAuthentication(authentication);

            }
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            log.info("만료된 access jwt 토큰입니다");
            String refreshJwt = resolveRefreshToken(request);
            log.info("refresh 토큰 : " + refreshJwt);
            ObjectMapper objectMapper = new ObjectMapper();
            //refersh 토큰이 있고
            //기존에 발급한 refresh 토큰이 맞다면
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            if (StringUtils.hasText(refreshJwt)) {
//                refresh 토큰이 있는경우, 토큰 유효성 검사.

                try {
                    if (tokenProvider.validateToken(refreshJwt, "refresh") &&
                            tokenProvider.checkRedisToken(refreshJwt)) {
                        //                    유효한 redisToken인경우. 새로운 accessToken을 만들어서 반환.
                        Authentication authentication = tokenProvider.getAuthentication(refreshJwt);
                        //                   아래 코드는 tokenProvider.createToken과 중복되니 따로 함수로 빼는게 나을듯함.
                        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
                        Date now = new Date();
                        String authorities = authentication.getAuthorities().stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.joining(","));
                        //                  access token 반환.
                        response.setStatus(HttpStatus.OK.value());
                        String accessToken = objectMapper.writeValueAsString(new Token(tokenProvider.createAccessToken(userPrincipal, now, authorities), null));
                        response.getWriter().print(accessToken);

                    }
                } catch (ExpiredJwtException ex) {
//                      refresh가 만료된경우. 잘못된 refresh인경우 처리.
                    response.setStatus(452);
                    String msg = objectMapper.writeValueAsString(new BaseResponse("fail", "refreshToken is valid but expire. plz login again"));
                    response.getWriter().print(msg);
                }
            } else {
//                refersh 토큰이 없는경우.
                response.setStatus(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS.value());
                String msg = objectMapper.writeValueAsString(new BaseResponse("fail", "expried access token, but refresh token not exists"));
                response.getWriter().print(msg);
            }

        }

    }

    private String resolveAccessToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
//            "Bearer " 뒤에 토큰을 반환.
            return bearerToken.substring(7);
        }
        return null;
    }

    private String resolveRefreshToken(HttpServletRequest request) {
        String refreshToken = request.getHeader(REFRESH_HEADER);
        if (StringUtils.hasText(refreshToken) && refreshToken.startsWith(BEARER_PREFIX)) {
//            "Bearer " 뒤에 토큰을 반환.
            return refreshToken.substring(7);
        }
        return null;
    }
}
