package com.ssafy.finedUi.db.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(name = "social")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Social {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "provider")
    private String provider;
}
