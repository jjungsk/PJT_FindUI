package com.ssafy.finedui.api.dto.personaldata;

import com.ssafy.finedui.db.entity.PersonalData;
import com.ssafy.finedui.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.awt.*;
import java.sql.Timestamp;

@Getter
@AllArgsConstructor
public class PersonalDataResponseDto {
    private Long missingIdx;
    private User user;
    private String name;
    private Integer birthDate;
    private Integer gender;
    private String frontImage;
    private String otherImage1;
    private String otherImage2;
    private Timestamp missingTime;
    private Point missingLocation;
    private Timestamp createDate;
    private Boolean isMissing;

    public PersonalDataResponseDto(PersonalData personalData) {
        this.missingIdx = personalData.getMissingIdx();
        this.user = personalData.getUser();
        this.name = personalData.getName();
        this.birthDate = personalData.getBirthDate();
        this.gender = personalData.getGender();
        this.frontImage = personalData.getFrontImage();
        this.otherImage1 = personalData.getOtherImage1();
        this.otherImage2 = personalData.getOtherImage2();
        this.missingTime = personalData.getMissingTime();
        this.missingLocation = personalData.getMissingLocation();
        this.createDate = personalData.getCreateDate();
        this.isMissing = personalData.getIsMissing();
    }
}
