package com.ssafy.finedui.common.jwt;


import com.ssafy.finedui.common.oauth.user.UserPrincipal;
import com.ssafy.finedui.common.properties.JwtProperties;
import io.jsonwebtoken.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;


@AllArgsConstructor
@Service
@Slf4j
//oAuthUser도 호환가능함.
public class TokenProvider {

    private static final String AUTHORITIES_KEY = "auth";
//    private static final String BEARER_TYPE = "Bearer";

    private JwtProperties jwtProperties;

    public Token createToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date now = new Date();
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        log.info("expiration : " + Long.toString(jwtProperties.getAuth().getAccessTokenExpirationTime()));

        String accessToken = Jwts.builder()
                .setSubject(userPrincipal.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + jwtProperties.getAuth().getAccessTokenExpirationTime()))
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getAuth().getTokenSecret())
                .compact();

        String refreshToken = Jwts.builder()
                .setSubject(userPrincipal.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + jwtProperties.getAuth().getRefreshTokenExpirationTime()))
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getAuth().getTokenSecret())
                .compact();

        return new Token(accessToken, refreshToken);
    }


    public Authentication getAuthentication(String accessToken) {
        //토큰 복호화후 정보반환
        Claims claims = parseClaims(accessToken);

        if (claims.get(AUTHORITIES_KEY) == null) {
//            controllerAdvice에서 처리.
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        //클레임에서 권한정보 가져오기.
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    private Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(jwtProperties.getAuth().getTokenSecret())
                    .build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public boolean validateToken(String token) {

        try {
            Jwts.parserBuilder().setSigningKey(jwtProperties.getAuth().getTokenSecret()).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 jwt 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 jwt 토큰입니다");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 jwt 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("jwt 토큰이 잘못되었습니다.");
        }

        return false;
    }

}
