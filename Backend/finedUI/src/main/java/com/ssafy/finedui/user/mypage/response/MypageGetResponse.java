package com.ssafy.finedui.user.mypage.response;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MypageGetResponse {

    
    private String name;
    private String nickname;
    private String address;
    private String phoneNumber;
    int isAdmin;
}
