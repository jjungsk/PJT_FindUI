package com.ssafy.finedUi;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication(exclude = {
        SecurityAutoConfiguration.class,
//        local에서 s3 접근할때 필요한 옵션.
        org.springframework.cloud.aws.autoconfigure.context.ContextInstanceDataAutoConfiguration.class,
        org.springframework.cloud.aws.autoconfigure.context.ContextStackAutoConfiguration.class,
        org.springframework.cloud.aws.autoconfigure.context.ContextRegionProviderAutoConfiguration.class
})
@EnableWebMvc
@Slf4j
public class FinedUiApplication {
    static {

        System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true");
        log.error("메타데이터" + System.getProperty("com.amazonaws.sdk.disableEc2Metadata"));
    }

    public static void main(String[] args) {
        SpringApplication.run(FinedUiApplication.class, args);
    }

}
