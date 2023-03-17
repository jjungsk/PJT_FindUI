package com.ssafy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {


        http
                .authorizeRequests()
//                //모든 url 인증필요없이 허용
                .antMatchers("/**").permitAll();
//                .and()
        //security가 제공하는 httpForm login html 무시.
//                .formLogin().disable();
//                .httpBasic().disable();
    }


}

