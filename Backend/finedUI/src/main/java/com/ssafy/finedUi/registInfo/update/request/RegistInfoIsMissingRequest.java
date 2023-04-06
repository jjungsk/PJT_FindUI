package com.ssafy.finedUi.registInfo.update.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistInfoIsMissingRequest {
    private Long registId;
    private Double longitude;
    private Double latitude;

}
