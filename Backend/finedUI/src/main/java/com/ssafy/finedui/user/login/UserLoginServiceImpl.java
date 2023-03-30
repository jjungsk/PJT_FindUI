package com.ssafy.finedui.user.login;

import com.ssafy.finedui.common.jwt.Token;
import com.ssafy.finedui.common.jwt.TokenProvider;
import com.ssafy.finedui.user.UserRepository;
import com.ssafy.finedui.user.login.request.UserLoginRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserLoginServiceImpl implements UserLoginService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    TokenProvider tokenProvider;

    @Override
    public Token login(UserLoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginRequest.getName(), loginRequest.getPassword());

        log.info("login controller ----------");

        try {

//          authenticationToken을 사용하여 Authentication 객체를 생성하기 위하여 authenticate 메소드가 실행될 때
//          CustomUserDetailsService 에 loadUserByUsername 메소드가 실행되고 , authentication에 해당 정보 저장.
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            //spring context에 저장할 이유가없음. 주석처리
//            SecurityContextHolder.getContext().setAuthentication(authentication);

            return tokenProvider.createToken(authentication);
        } catch (AuthenticationException e) {
            throw new RuntimeException(e);
        }


    }
}
