package com.ssafy.finedUi.common.jwt;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Token {
    String accessToken;

    String refreshToken;

}
