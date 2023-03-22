package com.ssafy.finedUi.api.dto.personalData;

import com.ssafy.finedUi.db.entity.PersonalData;
import com.ssafy.finedUi.db.entity.User;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class PersonalDataRequestDto {

    @Value("${image.upload.path}")
    private String path;                // 환경변수로 저장된 업로드 경로

    private Long missingId;            // 실종(사전 등록) 번호
    private Long userId;                // 보호자 번호
    private User user;                  // 사용자 : 보호자 번호로 조회한 사용자
    private String name;                // 이름
    private Integer birthDate;          // 생년월일 (ex: 1996.06.25)
    private Integer gender;             // 성별 (남자:1 여자:2)
    private Boolean isMissing;          // 실종 여부
    private Point missingLocation;      // 실종 위치
    private Timestamp missingTime;      // 실종 시간
    private MultipartFile frontImage;   // 정면 사진
    private MultipartFile otherImage1;  // 추가 사진 1
    private MultipartFile otherImage2;  // 추가 사진 2
    private String frontImagePath;      // 정면 사진 저장 경로
    private String otherImage1Path;     // 추가 사진 1 저장 경로
    private String otherImage2Path;     // 추가 사진 2 저장 경로
    private Timestamp createDate;       // 생성 시간

    public PersonalData toEntity() {
        return PersonalData.builder()
                .missingIdx(missingId)
                .name(name)
                .birthDate(birthDate)
                .gender(gender)
                .isMissing(isMissing)
                .missingLocation(missingLocation)
                .missingTime(missingTime)
                .frontImage(frontImagePath)
                .otherImage1(otherImage1Path)
                .otherImage2(otherImage2Path)
                .user(user)
                .createDate(createDate)
                .updateDate(Timestamp.valueOf(LocalDateTime.now()))
                .build();
    }

}
