package com.ssafy.finedUi.api.dto.PersonalImage;

import com.ssafy.finedUi.db.entity.PersonalImage;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Setter
@Getter
public class PersonalImageRequestDto {
    private String uploadFileName;
    private String uploadFilePath;

    @Builder
    public PersonalImageRequestDto(String uploadFileName, String uploadFilePath) {
        this.uploadFileName = uploadFileName;
        this.uploadFilePath = uploadFilePath;
    }

    public PersonalImage toEntity() {
        return PersonalImage.builder().uploadFileName(uploadFileName).uploadFilePath(uploadFilePath).build();
    }
}
