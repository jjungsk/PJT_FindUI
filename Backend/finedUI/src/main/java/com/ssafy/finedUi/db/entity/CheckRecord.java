package com.ssafy.finedUi.db.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name = "check_record")
@Getter
public class CheckRecord {
    @Id
    @GeneratedValue
    @Column(name= "check_record_id")
    private Long checkRecordId;

    @Column(name="user_id")
    private Long userId;

    @ManyToOne
    @JoinColumn(name="missing_id")
    private PersonalData missingId;

    private String image;
}
