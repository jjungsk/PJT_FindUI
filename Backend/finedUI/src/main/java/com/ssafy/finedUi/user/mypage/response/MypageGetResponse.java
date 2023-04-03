package com.ssafy.finedUi.user.mypage.response;


import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MypageGetResponse {


    @ApiModelProperty(value = "이름")
    private String name;

    @ApiModelProperty(value = "이메일")
    private String email;
    @ApiModelProperty(value = "주소")
    private String address;
    @ApiModelProperty(value = "휴대폰번호")
    private String phoneNumber;
    @ApiModelProperty(value = "관리자인지 표시. 1이면 관리자.")
    int isAdmin;
}
