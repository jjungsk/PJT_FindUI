package com.ssafy.finedUi.user.mypage.request;


import io.swagger.annotations.ApiModelProperty;

public class UserUpdateRequest {

    @ApiModelProperty(value = "주소")
    public String address;
    @ApiModelProperty(value = "휴대폰번호")
    public String phoneNumber;
    @ApiModelProperty(value = "name")
    public String name;

    @ApiModelProperty(value = "email")
    public String email;
}
