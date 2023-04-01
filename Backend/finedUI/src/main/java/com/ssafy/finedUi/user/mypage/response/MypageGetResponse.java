package com.ssafy.finedUi.user.mypage.response;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MypageGetResponse {


    private String name;
    private String email;
    private String address;
    private String phoneNumber;
    int isAdmin;
}
