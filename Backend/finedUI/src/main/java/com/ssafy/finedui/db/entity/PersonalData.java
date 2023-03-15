package com.ssafy.finedui.db.entity;


import lombok.Getter;
import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
@Entity
@Table(name = "personal_data")
@Getter
public class PersonalData {
    @Id @GeneratedValue
    @Column(name= "missing_id")
    private Long missingId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String name;

    @Column(name="birth_date")
    private String birthDate;
    private int gender;
    @Column(name="front_image")
    private String frontImage;
    @Column(name="other_image1")
    private String otherImage1;
    @Column(name="other_image2")
    private String otherImage2;
    @Column(name="missing_time")
    private Timestamp missingTime;
    @Column(name="create_date")
    private LocalDateTime createDate;
    @Column(name="is_missing")
    private boolean isMissing;

}
