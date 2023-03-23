package com.ssafy.finedUi.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.ssafy.finedUi.api.dto.ChatImage.ChatImageRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class S3Service {
    @Value("${cloud.aws.s3.base-path}")
    private String base_path;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3Client amazonS3Client;

    public String save(ChatImageRequestDto chatImageRequestDto) {
        MultipartFile multipartFile = chatImageRequestDto.getImage();   // 저장할 이미지 파일
        Long userId = chatImageRequestDto.getUserId();                  // 보호자 ID
        Long personalDataId = chatImageRequestDto.getPersonalDataId();  // 실종(등록)자 ID
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(multipartFile.getContentType());  // S3에 업로드 할 객체 content type 설정
        objectMetadata.setContentLength(multipartFile.getSize());       // S3에 업로드 할 객체 size 설정

        String storeFileName = String.valueOf(userId);                                      // 사용자 Id
        String key = base_path + personalDataId.toString() + "_" + storeFileName;                        // S3에 할당될 key(파일 이름)

        // S3 bucket에 이미지 업로드
        try (InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, key, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String storeFileUrl = amazonS3Client.getUrl(bucket, key).toString();    // S3에 업로드 된 이미지 링크
        return storeFileUrl;
    }

    public void delete(Long userId, Long missingId) {
        String key = base_path + missingId.toString() + "_" + userId.toString();  // S3 bucket에서 조회할 파일 이름(key)
        try {
            amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, key));      // 삭제 요청
        } catch (AmazonS3Exception e) {
            System.out.println(e.getErrorMessage());                                // 오류 발생 시
        }
    }
}
