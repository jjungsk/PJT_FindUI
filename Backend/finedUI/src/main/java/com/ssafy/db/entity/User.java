package com.ssafy.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name="User")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @Column(name="user_idx")
    private long userIdx;
    @Column(name="name")
    private String name;
    @Column(name="phone_number")
    private String phoneNumber;
    private String nickname;

    private String address;
    @Column(name="is_admin", columnDefinition = "TINYINT", length = 1)
    private int isAdmin;
    @Column(name="is_social", columnDefinition = "TINYINT", length = 1)
    private int isSocial;

    @Column(name="join_date")
    private LocalDateTime joinDate;
}
