package com.ssafy.finedui.user.login.request;


import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class UserLoginRequest {
    @ApiModelProperty(value = "이메일.", required = true)
    String name;

    @ApiModelProperty(value = "비밀번호", required = true)
    String password;

}
