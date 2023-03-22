package com.ssafy.finedUi.api.service.PersonalImage;

import org.springframework.web.multipart.MultipartFile;

public interface PersonalImageService {
    String[] save(MultipartFile[] multipartFiles, Long userId);
}
