package com.ssafy.finedUi.common.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "ai")
public class AiServerProperties {
    private String host;
    private String search;
    private String update;
    private String delete;
    private String create;
    private String change;

}
