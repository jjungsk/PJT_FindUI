package com.ssafy.finedui.common.jwt;


import com.ssafy.finedui.common.oauth.user.UserPrincipal;
import com.ssafy.finedui.common.properties.JwtProperties;
import com.ssafy.finedui.db.entity.User;
import io.jsonwebtoken.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;


@AllArgsConstructor
@Service
@Slf4j
//oAuthUser도 호환가능함.
public class TokenProvider {

    private static final String AUTHORITIES_KEY = "auth";
    //    private static final String BEARER_TYPE = "Bearer";
    private static final String USER_ID = "id";
    private JwtProperties jwtProperties;

    private StringRedisTemplate stringRedisTemplate;

    public Token createToken(Authentication authentication) {
        //token 생성후
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date now = new Date();
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        log.info("expiration : " + Long.toString(jwtProperties.getAuth().getAccessTokenExpirationTime()));

        String accessToken = createAccessToken(userPrincipal, now, authorities);
        String refreshToken = createRefreshToken(userPrincipal, now, authorities);
        //redis에 refresh토큰 저장.

//        log.info(jwtProperties.getAuth().getRefreshTokenExpirationTime() + "");

        stringRedisTemplate.opsForValue().set(userPrincipal.getId().toString(), refreshToken,
                jwtProperties.getAuth().getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return new Token(accessToken, refreshToken);
    }

    public String createAccessToken(UserPrincipal userPrincipal, Date now, String authorities) {
//        log.info("accesstoken 만들기 " + userPrincipal.getName());
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .claim(AUTHORITIES_KEY, authorities)
                .claim(USER_ID, userPrincipal.getId())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + jwtProperties.getAuth().getAccessTokenExpirationTime()))
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getAuth().getTokenSecret())
                .compact();
    }

    private String createRefreshToken(UserPrincipal userPrincipal, Date now, String authorities) {
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .claim(AUTHORITIES_KEY, authorities)
                .claim(USER_ID, userPrincipal.getId())
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + jwtProperties.getAuth().getRefreshTokenExpirationTime()))
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getAuth().getTokenSecret())
                .compact();
    }

    public Authentication getAuthentication(String accessToken) {
        //토큰 복호화후 정보반환
        Claims claims = parseClaims(accessToken);

        if (claims.get(AUTHORITIES_KEY) == null) {
//            controllerAdvice에서 처리.
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        if (claims.get(USER_ID) == null) {
//            controllerAdvice에서 처리.
            throw new RuntimeException("유저 ID 정보가 없습니다.");
        }

        //클레임에서 권한정보 가져오기.
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
//       UserDetails를 상속받아 작성한 UserPrincipal로 변경.
//        UserDetails principal = new User(claims.getSubject(), "", authorities);


        User user = new User();
        user.setUserIdx(Long.parseLong(claims.get(USER_ID).toString()));
        user.setName(claims.getSubject());

        log.info("token에서 이름 갖고오기 : " + user.getName());
//      여기가 좀 이상함. authorities..
        UserPrincipal userPrincipal = UserPrincipal.create(user, authorities);
        return new UsernamePasswordAuthenticationToken(userPrincipal, "", authorities);
    }

    private Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(jwtProperties.getAuth().getTokenSecret())
                    .build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public boolean validateToken(String token, String type) throws ExpiredJwtException {
        try {
            Jwts.parserBuilder().setSigningKey(jwtProperties.getAuth().getTokenSecret()).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 " + type + " jwt 서명입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 " + type + " jwt 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info(type + ": jwt 토큰이 잘못되었습니다.");
        }
        //        catch (ExpiredJwtException e) {
//            log.info("만료된 jwt 토큰입니다");
//        }

        return false;
    }


    public boolean checkRedisToken(String refreshToken) {
        //redis에 저장된 refresh와 검사.
        Claims claims = parseClaims(refreshToken);
        String userId = claims.get(USER_ID).toString();
        String redisRefreshToken = stringRedisTemplate.opsForValue().get(userId);
        if (redisRefreshToken != null && redisRefreshToken.equals(refreshToken)) {
            return true;
        }

        return false;
    }

//    public boolean validateRefreshToken(String refreshToken) {
//
//        try {
//            if (validateToken(refreshToken, "refresh")) {
//                return true;
//            }
//        } catch (ExpiredJwtException e) {
//            log.info("만료된 refresh jwt 토큰입니다.");
//        }
//        return false;
//    }
}
