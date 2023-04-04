package com.ssafy.finedUi.registInfo.image.save;

import org.springframework.web.multipart.MultipartFile;

public interface ImageSaveService {
    String[] save(MultipartFile[] multipartFiles, Long userId);
}
