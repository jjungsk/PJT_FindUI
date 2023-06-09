package com.ssafy.finedUi.registInfo.update.response;


import com.ssafy.finedUi.db.entity.RegistInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.sql.Timestamp;

@Getter
@AllArgsConstructor
public class RegistInfoUpdateResponse {
    private Long registId;              // 실종(사전 등록) 번호
    private Long userId;                // 사용자 번호
    private String name;                // 이름
    private Integer birthDate;          // 생년월일 (ex: 1996.06.25)
    private Integer gender;             // 성별 (남자:1 여자:2)
    private Boolean isMissing;          // 실종 여부
    //    private Point missingLocation;      // 실종 위치
    private Double longitude;           // 경도
    private Double latitude;            // 위도
    private String missingTime;      // 실종 시간
    private String frontImagePath;      // 정면 사진 저장 경로
    private String otherImage1Path;     // 추가 사진 1 저장 경로
    private String otherImage2Path;     // 추가 사진 2 저장 경로
    private String createDate;       // 생성 시간
    private String updateDate;       // 수정 시간
    private String description;         // 설명

    public RegistInfoUpdateResponse(RegistInfo registInfo) {
        this.registId = registInfo.getRegistId();
        this.userId = registInfo.getUser().getUserId();
        this.name = registInfo.getName();
        this.birthDate = registInfo.getBirthDate();
        this.gender = registInfo.getGender();
        this.isMissing = registInfo.getIsMissing();
        this.longitude = registInfo.getLongitude();
        this.latitude = registInfo.getLatitude();
        this.frontImagePath = registInfo.getFrontImagePath();
        this.otherImage1Path = registInfo.getOtherImage1Path();
        this.otherImage2Path = registInfo.getOtherImage2Path();
        this.missingTime = registInfo.getIsMissing() ?
                registInfo.getMissingTime().toString().substring(0,19).replace(" ", "T") : null;
        this.createDate = registInfo.getCreateDate().toString().substring(0,19).replace(" ", "T");
        this.updateDate = registInfo.getUpdateDate().toString().substring(0,19).replace(" ", "T");
        this.description = registInfo.getDescription();
    }
}
