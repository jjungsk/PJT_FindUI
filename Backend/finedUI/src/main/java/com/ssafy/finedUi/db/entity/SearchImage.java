package com.ssafy.finedUi.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "search_image")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SearchImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "missing_idx")
    private PersonalData personalData;

    @ManyToOne
    @JoinColumn(name = "user_idx")
    private User user;

    @Column(name = "image")
    private String image;
}
