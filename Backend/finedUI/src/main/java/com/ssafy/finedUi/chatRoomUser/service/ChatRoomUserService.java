package com.ssafy.finedUi.chatRoomUser.service;

import com.ssafy.finedUi.chatRoom.ChatRoomRepository;
import com.ssafy.finedUi.chatRoom.request.ChatRoomRequest;
import com.ssafy.finedUi.chatRoom.response.ChatRoomResponse;
import com.ssafy.finedUi.chatRoomUser.ChatRoomUserRepository;
import com.ssafy.finedUi.chatRoomUser.request.ChatRoomUserRequest;
import com.ssafy.finedUi.common.security.SecurityUtils;
import com.ssafy.finedUi.db.entity.ChatRoom;
import com.ssafy.finedUi.db.entity.ChatRoomUser;
import com.ssafy.finedUi.db.entity.User;
import com.ssafy.finedUi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomUserService {
    private final ChatRoomUserRepository chatRoomUserRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

//    @Transactional
//    public List<ChatRoom> getAllByUser(Long userId){
//        return chatRoomUserRepository.findAllByUser_Id(userId);
//    }
    //채팅방 입장
    @Transactional
    public Long save(final ChatRoomUserRequest req) {
        req.setChatRoom(this.chatRoomRepository.findById(req.getRoomId()).get());
        Long userId = SecurityUtils.getUserPricipal().getId();
        Optional<User> user = userRepository.findById(userId);
        req.setUser(user.get());
        return this.chatRoomUserRepository.save(req.toEntity()).getId();
    }
}
