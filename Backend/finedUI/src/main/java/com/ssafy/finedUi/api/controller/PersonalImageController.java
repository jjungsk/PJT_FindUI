package com.ssafy.finedUi.api.controller;

import com.ssafy.finedUi.api.service.PersonalImage.PersonalImageService;
import com.ssafy.finedUi.api.service.PersonalImage.PersonalImageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RequiredArgsConstructor
@RestController
@RequestMapping(path = "/personal_image")
public class PersonalImageController {

    private final PersonalImageServiceImpl personalImageService;

    @PostMapping(path = "")
    public void uploadFile(@RequestParam MultipartFile multipartFile, @RequestParam Long userId) {
        personalImageService.save(multipartFile, userId);
    }
}
