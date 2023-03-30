package com.ssafy.finedUi.registInfo.update.request;

import com.ssafy.finedUi.db.entity.RegistInfo;
import com.ssafy.finedUi.db.entity.User;
import com.ssafy.finedUi.registInfo.update.response.RegistInfoUpdateResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegistInfoUpdateRequest {
    private Long registId;              // 실종(사전 등록) 번호
    private Long userId;                // 사용자 번호
    private User user;                  // 사용자 : 보호자 번호로 조회한 사용자
    private String name;                // 이름
    private Integer birthDate;          // 생년월일 (ex: 1996.06.25)
    private Integer gender;             // 성별 (남자:1 여자:2)
    private Boolean isMissing;          // 실종 여부
    private Point missingLocation;      // 실종 위치
    private Timestamp missingTime;      // 실종 시간
    private Integer longitude;          // 경도
    private Integer latitude;           // 위도
    private MultipartFile frontImage;   // 정면 사진
    private MultipartFile otherImage1;  // 추가 사진 1
    private MultipartFile otherImage2;  // 추가 사진 2
    private String frontImagePath;      // 정면 사진 저장 경로
    private String otherImage1Path;     // 추가 사진 1 저장 경로
    private String otherImage2Path;     // 추가 사진 2 저장 경로
    private Timestamp createDate;       // 생성 시간

    public RegistInfoUpdateRequest(RegistInfo registInfo) {
        this.registId = registInfo.getRegistId();
        this.userId = registInfo.getUser().getUserId();
        this.name = registInfo.getName();                // 이름
        this.birthDate = registInfo.getBirthDate();          // 생년월일 (ex: 1996.06.25)
        this.gender = registInfo.getGender();             // 성별 (남자:1 여자:2)
        this.isMissing = registInfo.getIsMissing();          // 실종 여부
        this.missingLocation = registInfo.getMissingLocation();      // 실종 위치
        this.missingTime = registInfo.getMissingTime();      // 실종 시간
        this.frontImagePath = registInfo.getFrontImagePath();      // 정면 사진 저장 경로
        this.otherImage1Path = registInfo.getOtherImage1Path();     // 추가 사진 1 저장 경로
        this.otherImage2Path = registInfo.getOtherImage2Path();     // 추가 사진 2 저장 경로
        this.createDate = registInfo.getCreateDate();       // 생성 시간
    }

    public RegistInfo toEntity() {
        return RegistInfo.builder()
                .registId(registId)
                .name(name)
                .birthDate(birthDate)
                .gender(gender)
                .isMissing(isMissing)
                .missingLocation(missingLocation)
                .missingTime(missingTime)
                .frontImagePath(frontImagePath)
                .otherImage1Path(otherImage1Path)
                .otherImage2Path(otherImage2Path)
                .user(user)
                .createDate(createDate)
                .build();
    }
}
