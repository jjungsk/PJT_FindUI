package com.ssafy.finedUi.chatImage.create.service;

import com.ssafy.finedUi.chatImage.ChatImageRepository;
import com.ssafy.finedUi.chatImage.create.request.ChatImageCreateRequest;
import com.ssafy.finedUi.chatImage.create.response.ChatImageCreateResponse;
import com.ssafy.finedUi.chatImage.s3.save.S3SaveService;
import com.ssafy.finedUi.db.UserRepository;
import com.ssafy.finedUi.db.entity.ChatImageId;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@RequiredArgsConstructor    // 초기화 되지 않은 final 필드나 @NotNull 필드에 대해 생성자를 자동 생성해주는 annotation
@Service                    // root 컨테이너에 빈(Bean)객체로 생성
public class ChatImageCreateService {
    private final ChatImageRepository chatImageRepository;              // 채팅 이미지 저장소
    private final UserRepository userRepository;                        // 사용자 저장소
    private final RegistInfoRepository registInfoRepository;        // 실종(사전) 등록 저장소
    private final S3SaveService s3SaveService;

    @Transactional                                                      // 트랜잭션 처리 로직과 비즈니스 로직의 공존을 피하기 위해 내부적으로 AOP를 통해 트랜잭션 코드 처리 전 후로 구분해주는 annotation
    public ChatImageCreateResponse save(ChatImageCreateRequest chatImageCreateRequest) throws IOException {
        String storeFileUrl = s3SaveService.save(chatImageCreateRequest);              // S3에 이미지 저장
        chatImageCreateRequest.setImagePath(storeFileUrl);                         // 이미지 경로 request dto에 설정
        ChatImageId chatImageId = new ChatImageId();
        chatImageId.setRegistInfo(registInfoRepository.findById(chatImageCreateRequest.getRegistId()).get()); // 실종자 request dto에 설정
        chatImageId.setUser(userRepository.findById(chatImageCreateRequest.getUserId()).get()); // 보호자 request dto에 설정
        chatImageCreateRequest.setChatImageid(chatImageId);
        return new ChatImageCreateResponse(chatImageRepository.save(chatImageCreateRequest.toEntity()));               // request dto를 entity로 변환
    }
}
