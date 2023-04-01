package com.ssafy.finedUi.user.mypage.request;


import io.swagger.annotations.ApiModelProperty;

public class UserUpdateRequest {

    @ApiModelProperty(value = "address")
    public String addreess;
    @ApiModelProperty(value = "phoneNumber")
    public String phoneNumber;
    @ApiModelProperty(value = "name")
    public String name;

    @ApiModelProperty(value = "email")
    public String email;
}
