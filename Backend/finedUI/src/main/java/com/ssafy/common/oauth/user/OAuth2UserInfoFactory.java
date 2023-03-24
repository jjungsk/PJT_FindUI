package com.ssafy.common.oauth.user;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(AuthProvider.kakao.toString())) {
            return new KaKaoOAuth2UserInfo(attributes);
        } else {
            throw new RuntimeException("Unsupported Login Type : " + registrationId);
        }
    }

}
