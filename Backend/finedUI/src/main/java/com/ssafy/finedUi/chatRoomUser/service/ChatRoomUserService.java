package com.ssafy.finedUi.chatRoomUser.service;

import com.ssafy.finedUi.chatRoom.request.ChatRoomRequest;
import com.ssafy.finedUi.chatRoom.response.ChatRoomResponse;
import com.ssafy.finedUi.chatRoomUser.ChatRoomUserRepository;
import com.ssafy.finedUi.chatRoomUser.request.ChatRoomUserRequest;
import com.ssafy.finedUi.db.entity.ChatRoom;
import com.ssafy.finedUi.db.entity.ChatRoomUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomUserService {
    private final ChatRoomUserRepository chatRoomUserRepository;
//
//    @Transactional
//    public List<ChatRoom> getAllByUser(Long userId){
//        return chatRoomUserRepository.findAllByUser_Id(userId);
//    }

    @Transactional
    public Long save(final ChatRoomUserRequest req) {
        return this.chatRoomUserRepository.save(req.toEntity()).getId();
    }
}
