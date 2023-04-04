package com.ssafy.finedUi.chat.service;

import com.ssafy.finedUi.chat.ChatRoomRepository;
import com.ssafy.finedUi.chat.request.ChatRoomRequest;
import com.ssafy.finedUi.chat.response.ChatRoomResponse;
import com.ssafy.finedUi.db.entity.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    //userId에 맞는 채팅 목록 가져오기
    @Transactional
    public List<ChatRoomResponse> findAllByUserId(Long userId){
        List<ChatRoom> chatRoomList = this.chatRoomRepository.findChatRoomsByUser_Id(userId);
        System.out.println("chatRoomList"+chatRoomList);
        return chatRoomList.stream().map(ChatRoomResponse::new).collect(Collectors.toList());
    }
    //조회
//    @Transactional
//    public ChatRoomResponse findById(final Long chatMessageId){
//        ChatRoom entity = this.chatRoomRepository.findById(chatMessageId);
//        return new ChatRoomResponse(entity);
//    }
    // 생성
    @Transactional
    public Long save(final ChatRoomRequest req) {
        return this.chatRoomRepository.save(req.toEntity()).getId();
    }
    //삭제
    public void delete(final Long id) {
        ChatRoom entity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + id));
        this.chatRoomRepository.delete(entity);
    }
}
