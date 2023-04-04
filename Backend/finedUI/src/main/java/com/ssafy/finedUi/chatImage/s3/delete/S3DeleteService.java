package com.ssafy.finedUi.chatImage.s3.delete;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class S3DeleteService {
    @Value("${cloud.aws.s3.base-path}")
    private String base_path;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3Client amazonS3Client;

    @Transactional
    public void delete(Long userId, Long missingId) {
        String key = base_path + missingId.toString() + "_" + userId.toString() + ".png";  // S3 bucket에서 조회할 파일 이름(key)
        try {
            amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, key));      // 삭제 요청
        } catch (AmazonS3Exception e) {
            System.out.println(e.getErrorMessage());                                // 오류 발생 시
        }
    }
}
