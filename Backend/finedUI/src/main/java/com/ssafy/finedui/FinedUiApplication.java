package com.ssafy.finedui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
//springs boot가 자동으로 덮어씌우는 security 기본설정 무시.
@EnableWebMvc
public class FinedUiApplication {

    public static void main(String[] args) {
        SpringApplication.run(FinedUiApplication.class, args);
    }

}
