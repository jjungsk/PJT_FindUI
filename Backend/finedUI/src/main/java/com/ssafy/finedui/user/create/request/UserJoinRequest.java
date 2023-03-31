package com.ssafy.finedui.user.create.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class UserJoinRequest {
    @ApiModelProperty(value = "이름. 이메일(아이디역할)을 여기에 집어넣기.", required = true)
    String name;

    @ApiModelProperty(value = "휴대폰번호", required = true)
    String phoneNumber;

    @ApiModelProperty(value = "비밀번호", required = true)
    String password;

    @ApiModelProperty(value = "사용자 이름.", required = true)
    String nickName;

    @ApiModelProperty(value = "이메일이긴한데 여기선 안씀.")
    String email;

    @ApiModelProperty(value = "주소")
    String address;


}
