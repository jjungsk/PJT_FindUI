package com.ssafy.finedui.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RequiredArgsConstructor
@RestController
public class FileSystemController {
    
    // 환경변수로 저장된 업로드 경로
    @Value("${image.upload.path}")
    private String uploadPath;

    @PostMapping(path = "/upload")
    public void uploadFile(@RequestParam MultipartFile file, @RequestParam Long userId) {
        // 사진이 아닐 경우 종료
        if (file.getContentType().startsWith("image") == false) {
            System.out.println("this is not image");
            return;
        }
        // 저장 경로와 파일 이름 설정
        String saveName = uploadPath + File.separator + "Image" + File.separator + userId + "." + file.getContentType().split("/")[1]; // 파일 이름
        Path savePath = Paths.get(saveName); // 저장 경로

        // 폴더가 존재하는지 확인하고 존재하지 않는다면 폴더 생성
        File uploadPathFolder = new File(uploadPath, "Image");
        if (uploadPathFolder.exists() == false) {
            uploadPathFolder.mkdirs();
        }
        System.out.println("make dirs!");

        // 이미지 저장 시 IOException을 대비해 try catch 사용
        try {
            // 이미지 저장
            file.transferTo(savePath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
