package com.ssafy.finedUi.common;


import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BaseResponse {

    @ApiModelProperty(value = "success/fail 표시")
    String response;


    @ApiModelProperty(value = "메세지")
    String message;
}
