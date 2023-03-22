package com.ssafy.finedUi.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "chat_image")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class ChatImage {
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

    @Column(name = "image_path")
    private String imagePath;

}
