package com.ssafy.common.oauth.user;

import java.util.Map;

public class KaKaoOAuth2UserInfo extends OAuth2UserInfo {

    private Integer id;

    public KaKaoOAuth2UserInfo(Map<String, Object> attributes) {
        super((Map<String, Object>) attributes.get("kakao_account"));
        this.id = (Integer) attributes.get("id");
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
