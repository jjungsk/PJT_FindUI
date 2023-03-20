package com.ssafy.finedUi.api.dto.personalData;

import com.ssafy.finedUi.api.dto.PersonalImage.PersonalImageRequestDto;
import com.ssafy.finedUi.api.service.PersonalImage.PersonalImageServiceImpl;
import com.ssafy.finedUi.db.entity.PersonalData;
import com.ssafy.finedUi.db.entity.User;
import com.ssafy.finedUi.db.repository.UserRepository;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class PersonalDataRequestDto {

    // 환경변수로 저장된 업로드 경로
    @Value("${image.upload.path}")
    private String path;
    private Long missingIdx;
    private Long userId;
    private User user;
    private String name;
    private Integer birthDate;
    private Integer gender;
    private Boolean isMissing;
    private Point missingLocation;
    private Timestamp missingTime;
    private MultipartFile frontImage;
    private MultipartFile otherImage1;
    private MultipartFile otherImage2;
    private Timestamp createDate;

    @Builder
    PersonalDataRequestDto(Long missingIdx, Long userId, String name, Integer birthDate, Integer gender, Boolean isMissing, Point missingLocation, Timestamp missingTime, Timestamp createDate, MultipartFile frontImage, MultipartFile otherImage1, MultipartFile otherImage2) {
        this.missingIdx = missingIdx;
        this.userId = userId;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.isMissing = isMissing;
        this.missingLocation = missingLocation;
        this.missingTime = missingTime;
        this.frontImage = frontImage;
        this.otherImage1 = otherImage1;
        this.otherImage2 = otherImage2;
        this.createDate = createDate.toString().isEmpty() ? Timestamp.valueOf(LocalDateTime.now()) : createDate;
    }

    public String uploadPath(MultipartFile file) {
        return Paths.get(path + "Image" + File.separator + userId + "." + file.getContentType().split("/")[1]).toString(); // 저장 경로
    }

    public PersonalData toEntity() {
        return PersonalData.builder()
                .missing_idx(missingIdx)
                .name(name)
                .birthDate(birthDate)
                .gender(gender)
                .isMissing(isMissing)
                .missingLocation(missingLocation)
                .missingTime(missingTime)
                .frontImage(uploadPath(frontImage))
                .otherImage1(uploadPath(otherImage1))
                .otherImage2(uploadPath(otherImage2))
                .user(user)
                .createDate(createDate)
                .updateDate(Timestamp.valueOf(LocalDateTime.now()))
                .build();
    }

}
