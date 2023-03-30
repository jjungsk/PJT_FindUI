package com.ssafy.finedui.user.create.request;


import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class PhoneConfirmRequest {
    @ApiModelProperty(value = "휴대폰 번호", required = true)
    private String phoneNumber;
}
