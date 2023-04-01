package com.ssafy.finedUi.user.create.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class UserJoinRequest {
    @ApiModelProperty(value = "이름", required = true)
    String name;

    @ApiModelProperty(value = "휴대폰번호", required = true)
    String phoneNumber;

    @ApiModelProperty(value = "비밀번호", required = true)
    String password;

    @ApiModelProperty(value = "이메일")
    String email;

    @ApiModelProperty(value = "주소")
    String address;


}
