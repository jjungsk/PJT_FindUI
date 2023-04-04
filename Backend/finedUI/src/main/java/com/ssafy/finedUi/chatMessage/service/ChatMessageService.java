package com.ssafy.finedUi.chatMessage.service;

import com.ssafy.finedUi.chatRoom.ChatRoomRepository;
import com.ssafy.finedUi.chatMessage.ChatMessageRepository;
import com.ssafy.finedUi.chatMessage.request.ChatMessageRequest;
import com.ssafy.finedUi.chatMessage.response.ChatMessageResponse;
import com.ssafy.finedUi.db.entity.ChatMessage;
import com.ssafy.finedUi.db.entity.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class ChatMessageService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    // 조회
    @Transactional
    public ChatMessageResponse findById(final Long chatMessageId){
        ChatMessage chatMessageEntity = this.chatMessageRepository.findById(chatMessageId).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatMessage가 존재하지 않습니다. chatMessageId = " + chatMessageId));
        return new ChatMessageResponse(chatMessageEntity);
    }
    //생성

    /** ChatMessage 생성 */
    @Transactional
    public Long save(final Long chatRoomId, final ChatMessageRequest req) {
        ChatRoom chatRoomEntity = this.chatRoomRepository.findById(chatRoomId).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. chatRoomId = " + chatRoomId));
        req.setChatRoom(chatRoomEntity);
        return this.chatMessageRepository.save(req.toEntity()).getId();
    }

}
