package com.ssafy.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

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


    @Bean
    public Docket api() {

        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())//apiInfo 삽입
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy"))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title(API_NAME)
                .description(API_DESCRIPTION)
                .version(API_VERSION)
                .build();
    }

}
