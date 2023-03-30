package com.ssafy.finedui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
//springs boot가 자동으로 덮어씌우는 security 기본설정 무시.
@EnableWebMvc
//기본적으로 SpringBootApplication 같은 경로, 하위 경로에 있는 Component를 불러옴.
//com.ssafy 패키지 아래있는 Component들을 불러오기.
//@ComponentScan("com.ssafy.*")
////springBootApplication이 읽지 못함. 명시적으로 repository 불러오기.
//@EnableJpaRepositories("com.ssafy.*")
////springBootApplication이 읽지 못함. 명시적으로 entity 불러오기.
//@EntityScan("com.ssafy.*")
//ConfigurationProperties
public class FinedUiApplication {

    public static void main(String[] args) {
        SpringApplication.run(FinedUiApplication.class, args);
    }

}
