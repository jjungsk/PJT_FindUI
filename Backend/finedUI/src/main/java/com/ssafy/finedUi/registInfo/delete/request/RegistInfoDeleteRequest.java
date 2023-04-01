package com.ssafy.finedUi.registInfo.delete.request;

import com.ssafy.finedUi.db.entity.RegistInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.awt.*;
import java.sql.Timestamp;

@AllArgsConstructor
@Getter
@Setter
public class RegistInfoDeleteRequest {
    private Long registId;            // 실종(사전 등록) 번호
    private Long userId;                // 보호자 번호
    private String name;                // 이름
    private Integer birthDate;          // 생년월일 (ex: 1996.06.25)
    private Integer gender;             // 성별 (남자:1 여자:2)
    private Boolean isMissing;          // 실종 여부
    private Double longitude;      // 실종 위치
    private Double latitude;      // 실종 위치
    private Timestamp missingTime;      // 실종 시간
    private String frontImagePath;   // 정면 사진
    private String otherImage1Path;  // 추가 사진 1
    private String otherImage2Path;  // 추가 사진 2
    private Timestamp createDate;       // 생성 시간
    private Timestamp updateDate;       // 수정 시간

    public RegistInfoDeleteRequest(RegistInfo registInfo) {
        this.registId = registInfo.getRegistId();
        this.userId = registInfo.getUser().getUserId();
        this.name = registInfo.getName();
        this.birthDate = registInfo.getBirthDate();
        this.gender = registInfo.getGender();
        this.isMissing = registInfo.getIsMissing();
        this.longitude = registInfo.getLongitude();
        this.latitude = registInfo.getLatitude();
        this.missingTime = registInfo.getMissingTime();
        this.frontImagePath = registInfo.getFrontImagePath();
        this.otherImage1Path = registInfo.getOtherImage1Path();
        this.otherImage2Path = registInfo.getOtherImage2Path();
        this.createDate = registInfo.getCreateDate();
        this.updateDate = registInfo.getUpdateDate();
    }
}