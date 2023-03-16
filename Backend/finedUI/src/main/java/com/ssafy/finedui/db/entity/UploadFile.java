package com.ssafy.finedui.db.entity;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class UploadFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "upload_filename")
    private String uploadFileName;
    private String storeFileUrl;

    public UploadFile(String uploadFileName, String storeFileUrl) {
        this.uploadFileName = uploadFileName;
        this.storeFileUrl = storeFileUrl;
    }
}
