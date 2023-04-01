package com.ssafy.finedUi.user.mypage.response;


import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MypageGetResponse {


    private String name;
    private String email;
    private String address;
    @ApiModelProperty(value = "휴대폰이름")
    private String phoneNumber;
    @ApiModelProperty(value = "관리자인지 표시. 1이면 관리자.")
    int isAdmin;
}
