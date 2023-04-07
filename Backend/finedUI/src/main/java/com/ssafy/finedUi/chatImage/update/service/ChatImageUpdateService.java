package com.ssafy.finedUi.chatImage.update.service;

import com.ssafy.finedUi.chatImage.ChatImageRepository;
import com.ssafy.finedUi.chatImage.s3.save.S3SaveService;
import com.ssafy.finedUi.chatImage.update.request.ChatImageUpdateRequest;
import com.ssafy.finedUi.chatImage.update.response.ChatImageUpdateResponse;
import com.ssafy.finedUi.db.entity.ChatImageId;
import com.ssafy.finedUi.handler.ResponseHandler;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import com.ssafy.finedUi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ChatImageUpdateService {

    private final S3SaveService s3SaveService;
    private final ChatImageRepository chatImageRepository;
    private final RegistInfoRepository registInfoRepository;
    private final UserRepository userRepository;

    @Transactional
    public ChatImageUpdateResponse update(ChatImageUpdateRequest chatImageUpdateRequest) throws IOException {
        if (chatImageUpdateRequest.getImage() == null || chatImageUpdateRequest.getImage().isEmpty()) {
            return null;
        }
        chatImageUpdateRequest.setImagePath(s3SaveService.update(chatImageUpdateRequest));
        ChatImageId chatImageId = new ChatImageId();
        chatImageId.setRegistInfo(registInfoRepository.findById(chatImageUpdateRequest.getRegistId()).get());
        chatImageId.setUser(userRepository.findById(chatImageUpdateRequest.getUserId()).get());
        chatImageUpdateRequest.setChatImageId(chatImageId);
        return new ChatImageUpdateResponse(chatImageRepository.save(chatImageUpdateRequest.toEntity()));
    }
}
