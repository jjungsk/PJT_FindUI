package com.ssafy.finedUi.api.service.PersonalImage;

import com.ssafy.finedUi.api.dto.PersonalImage.PersonalImageRequestDto;
import com.ssafy.finedUi.db.entity.PersonalImage;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

public interface PersonalImageService {
    String[] save(MultipartFile[] multipartFiles, Long userId);
}
