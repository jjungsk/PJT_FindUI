package com.ssafy.finedUi.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.awt.*;
import java.sql.Timestamp;

@Entity
@Table(name = "personal_data")
@NoArgsConstructor              // 파라미터가 없는 생성자
@AllArgsConstructor             // 모든 필드를 파라미터로 가지는 생성자
@Builder                        // 생성자를 builder 패턴으로 생성
@Getter                         // 모든 필드 Getter 생성
public class PersonalData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "missing_idx")
    private Long missingIdx;            // 실종 번호

    @ManyToOne
    @JoinColumn(name = "user_idx")
    private User user;                  // 사용자(FK)

    @Column(name = "name", length = 10)
    private String name;                // 이름

    @Column(name = "birth_date")
    private Integer birthDate;          // 생년월일(ex: 1996.06.25)

    @Column(name = "gender")
    private Integer gender;             // 성별

    @Column(name = "front_image")
    private String frontImage;          // 정면 사진

    @Column(name = "other_image_1")
    private String otherImage1;         // 추가 사진 1

    @Column(name = "other_image_2")
    private String otherImage2;         // 추가 사진 2

    @Column(name = "missing_time")
    private Timestamp missingTime;      // 실종 시간

    @Column(name = "missing_location")
    private Point missingLocation;      // 실종 위치

    @Column(name = "create_date")
    private Timestamp createDate;       // 생성 시간

    @Column(name = "is_missing")
    private Boolean isMissing;          // 실종 여부

    @UpdateTimestamp
    @Column(name = "update_date")
    private Timestamp updateDate;       // 수정 시간
}
