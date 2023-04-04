package com.ssafy.finedUi.chatImage.get.service;

import com.ssafy.finedUi.chatImage.ChatImageRepository;
import com.ssafy.finedUi.chatImage.get.response.ChatImageGetResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatImageGetService {

    private final ChatImageRepository chatImageRepository;

    @Transactional
    public List<ChatImageGetResponse> searchByUser(Long userId) {
        return chatImageRepository.findAllByChatImageId_User_UserId(userId);
    }

    @Transactional
    public List<ChatImageGetResponse> searchByTarget(Long missingId) {
        return chatImageRepository.findAllByChatImageId_RegistInfo_RegistId(missingId);
    }
}
