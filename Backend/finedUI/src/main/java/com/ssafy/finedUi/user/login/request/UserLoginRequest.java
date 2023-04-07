package com.ssafy.finedUi.user.login.request;


import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class UserLoginRequest {
    @ApiModelProperty(value = "이메일 아이디", required = true)
    String email;

    @ApiModelProperty(value = "비밀번호", required = true)
    String password;

}
