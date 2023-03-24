package com.ssafy.finedUi.api.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI openAPI(@Value("${springdoc.swagger-ui.version}") String springdocVersion) {
        Info info = new Info()
                .title("finedUI API 설명서")
                .version(springdocVersion)
                .description("finedUI API");
        return new OpenAPI()
                .components(new Components())
                .info(info);
    }
}
