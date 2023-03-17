package com.ssafy.finedui.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.awt.*;
import java.sql.Timestamp;

@Entity
@Table(name = "personal_data")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PersonalData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "missing_idx")
    private Long missingIdx;

    @ManyToOne
    @JoinColumn(name = "user_idx")
    private User user;

    @Column(name = "name", length = 10)
    private String name;

    @Column(name = "birth_date")
    private Integer birthDate;

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "front_image")
    private String frontImage;

    @Column(name = "other_image_1")
    private String otherImage1;

    @Column(name = "other_image_2")
    private String otherImage2;

    @Column(name = "missing_time")
    private Timestamp missingTime;

    @Column(name = "missing_location")
    private Point missingLocation;

    @Column(name = "create_date")
    private Timestamp createDate;

    @UpdateTimestamp
    @Column(name = "update_date")
    private Timestamp updateDate;

    @Column(name = "is_missing")
    private Boolean isMissing;

    @Builder
    public PersonalData(Long missing_idx, String name, User user, Integer birthDate, Integer gender, String frontImage, String otherImage1, String otherImage2, Timestamp missingTime, Point missingLocation, Timestamp createDate, Timestamp updateDate, Boolean isMissing) {
        this.missingIdx = missing_idx;
        this.name = name;
        this.user = user;
        this.birthDate = birthDate;
        this.gender = gender;
        this.frontImage = frontImage;
        this.otherImage1 = otherImage1;
        this.otherImage2 = otherImage2;
        this.missingLocation = missingLocation;
        this.missingTime = missingTime;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.isMissing = isMissing;
    }
}
