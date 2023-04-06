package com.ssafy.finedUi.registInfo.get.response;

import com.ssafy.finedUi.db.entity.RegistInfo;
import com.ssafy.finedUi.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.awt.*;
import java.sql.Timestamp;

@Getter
@AllArgsConstructor
public class RegistInfoGetResponse {
    private Long registId;              // 실종 번호
//    private Long userId;                // 사용자(FK)
    private String name;                // 이름
    private Integer birthDate;          // 생년월일(ex: 1996.06.25)
    private Integer gender;             // 성별
    private String frontImagePath;      // 정면 사진
    private String otherImage1Path;     // 추가 사진 1
    private String otherImage2Path;     // 추가 사진 2
    private String missingTime;      // 실종 시간
    //    private Point missingLocation;      // 실종 위치
    private Double longitude;           // 경도
    private Double latitude;            // 위도
    private String createDate;       // 생성 시간
    private Boolean isMissing;          // 실종 여부
    private String updateDate;       // 수정 시간
    private User user;
    private String description;         // 설명

    public RegistInfoGetResponse(RegistInfo registInfo) {
        this.registId = registInfo.getRegistId();
//        this.userId = registInfo.getUser().getUserId();
        this.name = registInfo.getName();
        this.birthDate = registInfo.getBirthDate();
        this.gender = registInfo.getGender();
        this.frontImagePath = registInfo.getFrontImagePath();
        this.otherImage1Path = registInfo.getOtherImage1Path();
        this.otherImage2Path = registInfo.getOtherImage2Path();
        this.longitude = registInfo.getLongitude();
        this.latitude = registInfo.getLatitude();
        this.missingTime = registInfo.getIsMissing() ?
                registInfo.getMissingTime().toString().substring(0,19).replace(" ", "T") : null;
        this.createDate = registInfo.getCreateDate().toString().substring(0,19).replace(" ", "T");
        this.updateDate = registInfo.getUpdateDate().toString().substring(0,19).replace(" ", "T");
        this.isMissing = registInfo.getIsMissing();
        this.user = registInfo.getUser();
        this.description = registInfo.getDescription();
    }
}
