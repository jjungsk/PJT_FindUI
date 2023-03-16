package com.ssafy.finedui.api.dto.personaldata;

import com.ssafy.finedui.db.entity.PersonalData;
import com.ssafy.finedui.db.entity.User;
import com.ssafy.finedui.db.repository.UserRepository;
import lombok.*;

import java.awt.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
public class PersonalDataRequestDto {
    private Long missingIdx;
    private Long userId;
    private User user;
    private String name;
    private int birthDate;
    private int gender;
    private Boolean isMissing;
    private Point missingLocation;
    private Timestamp missingTime;
    private String frontImage;
    private String otherImage1;
    private String otherImage2;
    private Timestamp createDate;

    @Builder
    PersonalDataRequestDto(Long missingIdx, Long userId, String name, int birthDate, int gender, Boolean isMissing, Point missingLocation, Timestamp missingTime, Timestamp createDate, String frontImage, String otherImage1, String otherImage2) {
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

    UserRepository userRepository;

    public PersonalData toEntity() {
        return PersonalData.builder()
                .missing_idx(missingIdx)
                .name(name)
                .birthDate(birthDate)
                .gender(gender)
                .isMissing(isMissing)
                .missingLocation(missingLocation)
                .missingTime(missingTime)
                .frontImage(frontImage)
                .otherImage1(otherImage1)
                .otherImage2(otherImage2)
                .user(user)
                .createDate(createDate)
                .updateDate(Timestamp.valueOf(LocalDateTime.now()))
                .build();
    }

}
