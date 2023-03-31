package com.ssafy.finedui.user.mypage.request;


import io.swagger.annotations.ApiModelProperty;

public class UserUpdateRequest {

    @ApiModelProperty(value = "주소")
    public String addreess;
    @ApiModelProperty(value = "휴대폰번호")
    public String phoneNumber;
    @ApiModelProperty(value = "유저 이름")
    public String nickname;

    @ApiModelProperty(value = "유저 이메일.")
    public String name;
}
