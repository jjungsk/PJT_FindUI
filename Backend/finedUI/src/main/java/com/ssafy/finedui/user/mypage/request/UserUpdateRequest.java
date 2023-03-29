package com.ssafy.finedui.user.mypage.request;


import io.swagger.annotations.ApiModelProperty;

public class UserUpdateRequest {

    @ApiModelProperty(value = "address")
    public String addreess;
    @ApiModelProperty(value = "phoneNumber")
    public String phoneNumber;
    @ApiModelProperty(value = "nickname")
    public String nickname;

    @ApiModelProperty(value = "name")
    public String name;
}
