package com.ssafy.finedUi.registInfo.image.save;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageSaveServiceImpl implements ImageSaveService{

    // 환경변수로 저장된 업로드 경로
    @Value("${image.upload.path}")
    private String uploadPath;

    @Override
    public String[] save(MultipartFile[] multipartFiles, Long registId) {
        String[] imagePaths = new String[3];

        // 이미지 파일 배열 순회
        // value : 이미지 파일 인덱스
        for (int value=0; value<multipartFiles.length; value++) {
            // 이미지 파일
            MultipartFile file = multipartFiles[value];

            System.out.println(file.getContentType());
            // 이미지가 아닐 경우 종료
            if (file.getContentType() == null || file.getContentType().startsWith("image") == false) {
                System.out.println("this is not image");
                continue;
            }
            // 저장 경로와 파일 이름 설정
            //        String saveName = registId + "." + file.getContentType().split("/")[1]; // 파일 이름

            // 저장 경로
            int imageId = value + 1;
            Path savePath = Paths.get(uploadPath + registId + '_' + imageId + ".png"); // 저장 경로

            // 폴더가 존재하는지 확인하고 존재하지 않는다면 폴더 생성
            File uploadPathFolder = new File(uploadPath, "Image");
            if (uploadPathFolder.exists() == false) {
                uploadPathFolder.mkdirs();
                System.out.println("make dirs!");
            }

            // 이미지 저장 시 IOException을 대비해 try catch 사용
            try {
                // 이미지 저장
                file.transferTo(savePath);
                imagePaths[value] = savePath.toString();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return imagePaths;
    }
}
