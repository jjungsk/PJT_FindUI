package com.ssafy.finedUi.api.controller;

import com.ssafy.finedUi.api.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class S3Controller {
    public final S3Service s3Service;

    @GetMapping(path = "/uploadfile")
    public void uploadFile(@RequestParam MultipartFile multipartFile, @RequestParam Long userId)
        throws IOException {
        s3Service.saveUploadFile(multipartFile, userId);
    }
}
