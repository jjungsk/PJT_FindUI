package com.ssafy.finedUi.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "chat_image_id")
//    private Long id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "missing_id")
//    private PersonalData personalData;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    @MapsId("user")
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//
    @EmbeddedId
    private ChatImageId chatImageId;

    @Column(name = "image_path")
    private String imagePath;

}
