package com.ssafy.finedUi.chatRoom.service;

import com.ssafy.finedUi.chatRoom.ChatRoomRepository;
import com.ssafy.finedUi.chatRoom.request.ChatRoomRequest;
import com.ssafy.finedUi.chatRoom.response.ChatRoomResponse;
import com.ssafy.finedUi.chatRoomUser.ChatRoomUserRepository;
import com.ssafy.finedUi.chatRoomUser.request.ChatRoomUserRequest;
import com.ssafy.finedUi.db.entity.ChatRoom;
import com.ssafy.finedUi.db.entity.ChatRoomUser;
import com.ssafy.finedUi.db.entity.User;
import com.ssafy.finedUi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomUserRepository chatRoomUserRepository;
    private final UserRepository userRepository;

    //userId에 맞는 채팅 목록 가져오기(OK)
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
        Long id = this.chatRoomRepository.save(req.toEntity()).getId();
        ChatRoom chatRoom = this.chatRoomRepository.findById(id).get();
        ChatRoomUserRequest chatRoomUserRequest = new ChatRoomUserRequest(chatRoom);
        this.chatRoomUserRepository.save(chatRoomUserRequest.toEntity());
        return this.chatRoomRepository.save(req.toEntity()).getId();
    }
    //삭제
    public void delete(final Long id) {
        ChatRoom entity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + id));
        this.chatRoomRepository.delete(entity);
    }
}
