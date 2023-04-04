package com.ssafy.finedUi.common.oauth.user;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;


@Slf4j
public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
//        log.info("OAuth2UserInfoFactory : " + attributes.toString());
        if (registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider.kakao.toString())) {
            return new KaKaoOAuth2UserInfo(attributes);
        } else {
            throw new RuntimeException("Unsupported Login Type : " + registrationId);
        }
    }

}
