package com.ssafy.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.List;

@Configuration
public class SwaggerConfiguration {

    // 2.9.2를 위해 추가적용. classpath를 인식못해서 포기.
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        //swagger-ul.html을 이용하기위해 경로등록.
//        registry.addResourceHandler("swagger-ul.html")
//                .addResourceLocations("classpath:/META-INF/resources/");
//        registry.addResourceHandler("/webjars/**")
//                .addResourceLocations("classpath:/META-INF/resources/webjars/");
//        super.addResourceHandlers(registry);
//    }


    private static final String API_NAME = "Fined&You API";
    private static final String API_VERSION = "0.0.1";
    private static final String API_DESCRIPTION = "API명세서";
    private static final String REFERENCE = "Bearer 토큰 값";

    @Bean
    public Docket api() {

        return new Docket(DocumentationType.OAS_30)
                .apiInfo(apiInfo())//apiInfo 삽입
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy"))
                .paths(PathSelectors.any())
                .build()
                .securityContexts(List.of(securityContext()))
                .securitySchemes(List.of(bearerAuthSecurityScheme()));
    }

    private SecurityContext securityContext() {
        return springfox.documentation
                .spi.service.contexts
                .SecurityContext
                .builder()
                .securityReferences(defaultAuth())
                .operationSelector(operationContext -> true)
                .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = new AuthorizationScope("global", "accessEverything");
        return List.of(new SecurityReference(REFERENCE, authorizationScopes));
    }

    private ApiKey apiKey() {
        return new ApiKey("Bearer +accessToken", "Authorization", "header");
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title(API_NAME)
                .description(API_DESCRIPTION)
                .version(API_VERSION)
                .build();
    }

    private HttpAuthenticationScheme bearerAuthSecurityScheme() {
        return HttpAuthenticationScheme.JWT_BEARER_BUILDER
                .name(REFERENCE).build();
    }

}
