package com.ssafy.finedUi.chatImage.s3.save;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.finedUi.chatImage.create.request.ChatImageCreateRequest;
import com.ssafy.finedUi.chatImage.update.request.ChatImageUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class S3SaveService {
    @Value("${cloud.aws.s3.base-path}")
    private  String base_path;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3Client amazonS3Client;

    public String save(ChatImageCreateRequest chatImageCreateRequest) {
        MultipartFile multipartFile = chatImageCreateRequest.getImage();   // 저장할 이미지 파일
        Long userId = chatImageCreateRequest.getUserId();                  // 보호자 ID
        Long registId = chatImageCreateRequest.getRegistId();  // 실종(등록)자 ID
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType("image/png");  // S3에 업로드 할 객체 content type 설정
        objectMetadata.setContentLength(multipartFile.getSize());       // S3에 업로드 할 객체 size 설정

        String key = base_path + registId.toString() + "_" + userId.toString() + ".png";                        // S3에 할당될 key(파일 이름)

        // S3 bucket에 이미지 업로드
        upload(key, objectMetadata, multipartFile);
        String storeFileUrl = amazonS3Client.getUrl(bucket, key).toString();    // S3에 업로드 된 이미지 링크
        return storeFileUrl;
    }

    public String update(ChatImageUpdateRequest chatImageUpdateRequest) {
        MultipartFile multipartFile = chatImageUpdateRequest.getImage();   // 저장할 이미지 파일
        Long userId = chatImageUpdateRequest.getUserId();                  // 보호자 ID
        Long registId = chatImageUpdateRequest.getRegistId();  // 실종(등록)자 ID
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType("image/png");  // S3에 업로드 할 객체 content type 설정
        objectMetadata.setContentLength(multipartFile.getSize());       // S3에 업로드 할 객체 size 설정

        String key = base_path + registId.toString() + "_" + userId.toString() + ".png";                        // S3에 할당될 key(파일 이름)

        // S3 bucket에 이미지 업로드
        upload(key, objectMetadata, multipartFile);
        String storeFileUrl = amazonS3Client.getUrl(bucket, key).toString();    // S3에 업로드 된 이미지 링크
        return storeFileUrl;
    }


    public void upload(String key, ObjectMetadata objectMetadata, MultipartFile multipartFile) {
        try (InputStream inputStream = multipartFile.getInputStream()){
            amazonS3Client.putObject(new PutObjectRequest(bucket, key, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}