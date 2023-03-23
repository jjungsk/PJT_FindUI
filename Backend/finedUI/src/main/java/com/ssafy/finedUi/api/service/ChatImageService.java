package com.ssafy.finedUi.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.ssafy.finedUi.api.dto.ChatImage.ChatImageRequestDto;
import com.ssafy.finedUi.api.dto.ChatImage.ChatImageResponseDto;
import com.ssafy.finedUi.db.entity.ChatImage;
import com.ssafy.finedUi.db.entity.ChatImageId;
import com.ssafy.finedUi.db.repository.ChatImageRepository;
import com.ssafy.finedUi.db.repository.PersonalDataRepository;
import com.ssafy.finedUi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RequiredArgsConstructor    // 초기화 되지 않은 final 필드나 @NotNull 필드에 대해 생성자를 자동 생성해주는 annotation
@Service                    // root 컨테이너에 빈(Bean)객체로 생성
public class ChatImageService {
    private final AmazonS3Client amazonS3Client;                        // 요청을 보낼 S3 클라이언트
    private final ChatImageRepository chatImageRepository;              // 채팅 이미지 저장소
    private final UserRepository userRepository;                        // 사용자 저장소
    private final PersonalDataRepository personalDataRepository;        // 실종(사전) 등록 저장소
    private final S3Service s3Service;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;                                              // bucket 이름
    @Value("${cloud.aws.s3.base-path}")
    private String base_path;                                           // 기본 저장 경로

    @Transactional
    public List<ChatImageResponseDto> searchByUser(Long userId) {
        return chatImageRepository.findAllByChatImageId_User_UserId(userId);
    }

    @Transactional
    public List<ChatImageResponseDto> searchByTarget(Long missingId) {
        return chatImageRepository.findAllByChatImageId_PersonalData_MissingId(missingId);
    }

    @Transactional                                                      // 트랜잭션 처리 로직과 비즈니스 로직의 공존을 피하기 위해 내부적으로 AOP를 통해 트랜잭션 코드 처리 전 후로 구분해주는 annotation
    public void save(ChatImageRequestDto chatImageRequestDto) throws IOException {
        String storeFileUrl = s3Service.save(chatImageRequestDto);              // S3에 이미지 저장
        chatImageRequestDto.setImagePath(storeFileUrl);                         // 이미지 경로 request dto에 설정
        chatImageRequestDto.setPersonalData(personalDataRepository.findById(chatImageRequestDto.getPersonalDataId()).get()); // 실종자 request dto에 설정
        chatImageRequestDto.setUser(userRepository.findById(chatImageRequestDto.getUserId()).get()); // 보호자 request dto에 설정
        chatImageRepository.save(chatImageRequestDto.toEntity());               // request dto를 entity로 변환
    }

    @Transactional
    public void delete(Long userId, Long missingId) {
        s3Service.delete(userId, missingId);                                            // S3에서 이미지 삭제
        ChatImageId chatImageId = new ChatImageId();                                    // 복합키 생성
        chatImageId.setUser(userRepository.findById(userId).get());                     // 복합키에 유저 번호 할당
        chatImageId.setPersonalData(personalDataRepository.findById(missingId).get());  // 복합키에 실종(등록) 번호 할당
        ChatImage chatImage = chatImageRepository.findByChatImageId(chatImageId).get(); // 사용자, 실종(등록) 번호를 통해 chatImage 조회
        chatImageRepository.delete(chatImage);          // db에서 삭제
    }
}
