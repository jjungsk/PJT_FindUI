package com.ssafy.finedUi.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PersonalImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "upload_filename")
    private String uploadFileName;

    @Column(name = "upload_filepath")
    private String uploadFilePath;

    @Builder
    public PersonalImage(String uploadFileName, String uploadFilePath) {
        this.uploadFileName = uploadFileName;
        this.uploadFilePath = uploadFilePath;
    }
}
