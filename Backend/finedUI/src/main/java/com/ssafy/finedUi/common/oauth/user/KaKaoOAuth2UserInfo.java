package com.ssafy.finedUi.common.oauth.user;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Slf4j
public class KaKaoOAuth2UserInfo extends OAuth2UserInfo {

    private Long id;

    public KaKaoOAuth2UserInfo(Map<String, Object> attributes) {
        super((Map<String, Object>) attributes.get("kakao_account"));
//        log.info("kakaoOAuth : " + attributes.toString());
        this.id = (Long) attributes.get("id");
    }

    @Override
    public String getId() {
        return this.id.toString();
    }

    @Override
    public String getName() {
        return (String) ((Map<String, Object>) attributes.get("profile")).get("nickname");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) ((Map<String, Object>) attributes.get("profile")).get("thumbnail_image_url");
    }

}
