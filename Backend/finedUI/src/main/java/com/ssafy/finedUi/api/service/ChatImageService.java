package com.ssafy.finedUi.api.service;

import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.ssafy.finedUi.api.dto.ChatImage.ChatImageRequestDto;
import com.ssafy.finedUi.api.dto.ChatImage.ChatImageResponseDto;
import com.ssafy.finedUi.db.entity.ChatImage;
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
import java.util.Optional;

@RequiredArgsConstructor    // 초기화 되지 않은 final 필드나 @NotNull 필드에 대해 생성자를 자동 생성해주는 annotation
@Service                    // root 컨테이너에 빈(Bean)객체로 생성
public class ChatImageService {
    private final AmazonS3Client amazonS3Client;                        // 요청을 보낼 S3 클라이언트
    private final ChatImageRepository chatImageRepository;              // 채팅 이미지 저장소
    private final UserRepository userRepository;                        // 사용자 저장소
    private final PersonalDataRepository personalDataRepository;        // 실종(사전) 등록 저장소

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;                                              // bucket 이름
    private String base_path = "chat_image/";                           // 기본 저장 경로

    @Transactional                                                      // 트랜잭션 처리 로직과 비즈니스 로직의 공존을 피하기 위해 내부적으로 AOP를 통해 트랜잭션 코드 처리 전 후로 구분해주는 annotation
    public void save(ChatImageRequestDto chatImageRequestDto) throws IOException {
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
        }

        String storeFileUrl = amazonS3Client.getUrl(bucket, key).toString();    // S3에 업로드 된 이미지 링크
        Optional<ChatImageResponseDto> chatImageResponseDto = chatImageRepository.findByImagePath(storeFileUrl); // imagePath를 통해 중복 조회
        if (chatImageResponseDto.isPresent()) {                                                                  // 중복 될 경우
            chatImageRequestDto.setId(chatImageResponseDto.get().getId());                                       // id를 requestdto에 설정해 update 되도록
        }
        chatImageRequestDto.setImagePath(storeFileUrl);                         // 이미지 경로 request dto에 설정
        chatImageRequestDto.setPersonalData(personalDataRepository.findById(chatImageRequestDto.getPersonalDataId()).get()); // 실종자 request dto에 설정
        chatImageRequestDto.setUser(userRepository.findById(chatImageRequestDto.getUserId()).get()); // 보호자 request dto에 설정
        chatImageRepository.save(chatImageRequestDto.toEntity());               // request dto를 entity로 변환
    }

    @Transactional
    public void delete(Long userId, Long missingId) {
        String key = base_path + userId.toString() + "_" + missingId.toString();  // S3 bucket에서 조회할 파일 이름(key)
        try {
            amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, key));      // 삭제 요청
        } catch (AmazonS3Exception e) {
            System.out.println(e.getErrorMessage());                                // 오류 발생 시
        }
        ChatImage chatImage = chatImageRepository.findByUser_UserIdxAndPersonalData_MissingIdx(userId, missingId).get().toEntity(); // 사용자, 실종(등록) 번호를 통해 chatImage 조회
        chatImageRepository.delete(chatImage);          // db에서 삭제
    }
}
