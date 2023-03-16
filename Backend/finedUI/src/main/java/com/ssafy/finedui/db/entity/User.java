package com.ssafy.finedui.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@DynamicInsert /* default 값을 세팅해주기 위한 annotation */
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_idx")
    private Long userIdx;

    @Column(name = "name", length = 10)
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "is_admin")
    @ColumnDefault("0")
    private int isAdmin;

    @Column(name = "join_date")
    private Timestamp joinDate;

    @Column(name = "is_social")
    private Boolean isSocial;
}
