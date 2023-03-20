package com.ssafy.finedUi.api.service.PersonalImage;

import com.ssafy.finedUi.api.dto.PersonalImage.PersonalImageRequestDto;
import com.ssafy.finedUi.db.entity.PersonalImage;
import com.ssafy.finedUi.db.repository.PersonalImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class PersonalImageServiceImpl implements PersonalImageService {

    // 환경변수로 저장된 업로드 경로
    @Value("${image.upload.path}")
    private String uploadPath;

    private final PersonalImageRepository personalImageRepository;

    @Override
    public PersonalImageRequestDto save(MultipartFile file, @RequestParam Long userId) {
        // 사진이 아닐 경우 종료
        if (file.getContentType().startsWith("image") == false) {
            System.out.println("this is not image");
            return null;
        }
        // 저장 경로와 파일 이름 설정
        String saveName = userId + "." + file.getContentType().split("/")[1]; // 파일 이름
        Path savePath = Paths.get(uploadPath + "Image" + File.separator + userId + "." + file.getContentType().split("/")[1]); // 저장 경로

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
        return PersonalImageRequestDto.builder().uploadFilePath(savePath.toString()).uploadFileName(saveName).build();
    }
}
