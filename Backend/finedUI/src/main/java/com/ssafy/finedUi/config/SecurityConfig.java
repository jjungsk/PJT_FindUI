package com.ssafy.finedUi.config;

import com.ssafy.finedUi.common.jwt.CustomUserDetailService;
import com.ssafy.finedUi.common.jwt.JwtTokenAuthenticationFilter;
import com.ssafy.finedUi.common.jwt.RestAuthenticationEntryPoint;
import com.ssafy.finedUi.common.oauth.CustomOAuth2UserService;
import com.ssafy.finedUi.common.oauth.HttpCookieOAuth2AuthorizationRequestRepository;
import com.ssafy.finedUi.common.oauth.OAuth2AuthenticationFailureHandler;
import com.ssafy.finedUi.common.oauth.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomUserDetailService customUserDetailService;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    //    비밀번호 암호화에 사용되는 encoder 등록.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //  jwt 검증 필터 Bean으로 제공.
    @Bean
    public JwtTokenAuthenticationFilter jwtTokenAuthenticationFilter() {
        return new JwtTokenAuthenticationFilter();
    }

    @Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieOAuth2AuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
//                swagger 진입시 security 동작 안하도록.
                .antMatchers("/v3/api-docs", "/swagger*/**")
//                error controller 진입시 security 동작 안하도록.
                .antMatchers("/error");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {


        http
//                해커가 iframe으로 접근하지 못하도록 x-frames-option : deny(security 기본값)
//                .headers().frameOptions()
//                cookie 사용을 안하니 csrf 취약점 없음. csrf 토큰 옵션 비활성화
                .csrf().disable()
                //                security가 제공하는 httpBasic 인증을 사용안함.
                .httpBasic().disable()
//               security가 제공하는 formLogin 사용안함. 비활성화.
                .formLogin().disable()
                .authorizeRequests()
//                //일단 모든 url 인증필요없이 허용
//                .antMatchers("/**").permitAll()
                //login, oauth url만 모두 허용.
                .antMatchers("/api/user/login", "/api/user/create", "/api/user/phoneconfirm", "/api/user/phoneauth", "/oauth2/**").permitAll() //authenticated 테스트 403 에러 반환 확인.
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(new RestAuthenticationEntryPoint())
                // 시큐리티는 기본적으로 세션을 사용
                // 여기서는 세션을 사용하지 않기 때문에 세션 설정을 Stateless 로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

//                oAuth2 설정.
                .and()
                .oauth2Login()
                .authorizationEndpoint().baseUri("/oauth2/authorization")
                .authorizationRequestRepository(cookieOAuth2AuthorizationRequestRepository())
                .and()
                .redirectionEndpoint().baseUri("/oauth2/callback/*")
                .and()
                .userInfoEndpoint().userService(customOAuth2UserService)
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .failureHandler(oAuth2AuthenticationFailureHandler);

//              cors설정

//        jwt Token 검사 필터등록.
        http.
                addFilterBefore(jwtTokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);


    }


}

