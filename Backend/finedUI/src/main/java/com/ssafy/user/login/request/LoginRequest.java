package com.ssafy.user.login.request;


import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class LoginRequest {
    @ApiModelProperty(value = "이름", required = true)
    String name;

    @ApiModelProperty(value = "비밀번호", required = true)
    String password;

}
