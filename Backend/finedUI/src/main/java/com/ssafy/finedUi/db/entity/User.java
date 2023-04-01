package com.ssafy.finedUi.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "User")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long userId;

    @Column(name = "name", length = 50)
    private String name;
    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;
    @Column(name = "is_admin", columnDefinition = "TINYINT", length = 1, insertable = false, updatable = false)
    @ColumnDefault("0")
    private int isAdmin;

//    social table확장으로 사용안함.
//    @Column(name = "is_social", columnDefinition = "TINYINT", length = 1)
//    private int isSocial;


    @ManyToOne
    @JoinColumn(name = "social_id")
    private Social social;

    @CreationTimestamp
    @Column(name = "join_date")
    private Timestamp joinDate;
    @Column(name = "email", length = 50, unique = true)
    private String email;

    @Column(name = "password")
    private String password;
}
