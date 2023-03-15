package com.ssafy.finedui.db.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name = "user")
@Getter
public class User {
    @Id
    @GeneratedValue
    @Column(name= "user_id")
    private Long userId;
    private String name;

}
