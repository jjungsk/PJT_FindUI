package com.ssafy.finedUi.common.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "sms")
public class SMSProperties {
    String serviceId;
    String accessKeyId;
    String secretKeyId;
    int expiration;

}
