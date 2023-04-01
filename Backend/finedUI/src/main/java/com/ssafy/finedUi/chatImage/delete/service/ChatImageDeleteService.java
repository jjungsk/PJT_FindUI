package com.ssafy.finedUi.chatImage.delete.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.ssafy.finedUi.chatImage.ChatImageRepository;
import com.ssafy.finedUi.chatImage.s3.delete.S3DeleteService;
import com.ssafy.finedUi.db.entity.ChatImage;
import com.ssafy.finedUi.db.entity.ChatImageId;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import com.ssafy.finedUi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatImageDeleteService {
    @Value("${cloud.aws.s3.base-path}")
    private String base_path;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3Client amazonS3Client;

    private final UserRepository userRepository;
    private final RegistInfoRepository registInfoRepository;
    private final ChatImageRepository chatImageRepository;
    private final S3DeleteService s3DeleteService;

    @Transactional
    public void delete(Long userId, Long missingId) {
        s3DeleteService.delete(userId, missingId);                                      // S3에서 이미지 삭제
        ChatImageId chatImageId = new ChatImageId();                                    // 복합키 생성
        chatImageId.setUser(userRepository.findById(userId).get());                     // 복합키에 유저 번호 할당
        chatImageId.setRegistInfo(registInfoRepository.findById(missingId).get());  // 복합키에 실종(등록) 번호 할당
        ChatImage chatImage = chatImageRepository.findByChatImageId(chatImageId).get(); // 사용자, 실종(등록) 번호를 통해 chatImage 조회
        chatImageRepository.delete(chatImage);          // db에서 삭제
    }
}
