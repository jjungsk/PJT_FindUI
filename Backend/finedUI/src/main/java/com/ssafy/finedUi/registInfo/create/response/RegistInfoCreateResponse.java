package com.ssafy.finedUi.registInfo.create.response;

import com.ssafy.finedUi.db.entity.RegistInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.sql.Timestamp;

@Getter
@AllArgsConstructor
public class RegistInfoCreateResponse {
    private Long registId;            // 실종(사전 등록) 번호
    private Long userId;                // 보호자 번호
    private String name;                // 이름
    private Integer birthDate;          // 생년월일 (ex: 1996.06.25)
    private Integer gender;             // 성별 (남자:1 여자:2)
    private Boolean isMissing;          // 실종 여부
    private Point missingLocation;      // 실종 위치
    private Timestamp missingTime;      // 실종 시간
    private String frontImagePath;      // 정면 사진 저장 경로
    private String otherImage1Path;     // 추가 사진 1 저장 경로
    private String otherImage2Path;     // 추가 사진 2 저장 경로
    private Timestamp createDate;       // 생성 시간
    private Timestamp updateDate;       // 수정 시간

    public RegistInfoCreateResponse(RegistInfo registInfo) {
        this.registId = registInfo.getRegistId();
        this.userId = registInfo.getUser().getUserId();
        this.name = registInfo.getName();
        this.birthDate = registInfo.getBirthDate();
        this.gender = registInfo.getGender();
        this.isMissing = registInfo.getIsMissing();
        this.missingLocation = registInfo.getMissingLocation();
        this.missingTime = registInfo.getMissingTime();
        this.frontImagePath = registInfo.getFrontImagePath();
        this.otherImage1Path = registInfo.getOtherImage1Path();
        this.otherImage2Path = registInfo.getOtherImage2Path();
        this.createDate = registInfo.getCreateDate();
        this.updateDate = registInfo.getUpdateDate();
    }
}
