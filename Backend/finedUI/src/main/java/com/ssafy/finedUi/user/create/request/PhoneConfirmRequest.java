package com.ssafy.finedUi.user.create.request;


import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class PhoneConfirmRequest {

    @ApiModelProperty(value = "휴대폰 번호", required = true)
    String phoneNumber;
    @ApiModelProperty(value = "코드", required = true)
    String code;
}
