package com.ssafy.finedUi.chatRoom.service;

import com.ssafy.finedUi.chatRoom.ChatRoomRepository;
import com.ssafy.finedUi.chatRoom.request.ChatRoomRequest;
import com.ssafy.finedUi.chatRoom.response.ChatRoomResponse;
import com.ssafy.finedUi.chatRoomUser.ChatRoomUserRepository;
import com.ssafy.finedUi.chatRoomUser.request.ChatRoomUserRequest;
import com.ssafy.finedUi.common.security.SecurityUtils;
import com.ssafy.finedUi.db.entity.ChatRoom;
import com.ssafy.finedUi.db.entity.ChatRoomUser;
import com.ssafy.finedUi.db.entity.User;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import com.ssafy.finedUi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomUserRepository chatRoomUserRepository;
    private final UserRepository userRepository;
    private final RegistInfoRepository registInfoRepository;



    //userId에 맞는 채팅 목록 가져오기(OK)
    @Transactional
    public List<ChatRoomResponse> findAllByUserId(Long userId){
        List<ChatRoom> chatRoomList = this.chatRoomRepository.findChatRoomsByUser_Id(userId);
       
        return chatRoomList.stream().map(ChatRoomResponse::new).collect(Collectors.toList());
    }
    @Transactional
    public Long findByRegistId(Long registId){
        ChatRoom chatRoom = this.chatRoomRepository.findByRegistInfo_RegistId(registId);
        return chatRoom.getId();
    }
    //조회
//    @Transactional
//    public ChatRoomResponse findById(final Long chatMessageId){
//        ChatRoom entity = this.chatRoomRepository.findById(chatMessageId);
//        return new ChatRoomResponse(entity);
//    }
    // 생성A
    @Transactional
    public Long save(final ChatRoomRequest req) {
        req.setRegistInfo(this.registInfoRepository.findById(req.getRegistId()).get());
        ChatRoom chatRoom = this.chatRoomRepository.save(req.toEntity());
        Long userId = SecurityUtils.getUserPricipal().getId();
        Optional<User> user = userRepository.findById(userId);
        ChatRoomUserRequest chatRoomUserRequest = new ChatRoomUserRequest(chatRoom,user.get());
        this.chatRoomUserRepository.save(chatRoomUserRequest.toEntity());
        return chatRoom.getId();
    }
    //삭제
    public void delete(final Long id) {
        ChatRoom entity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 ChatRoom이 존재하지 않습니다. id = " + id));
        this.chatRoomRepository.delete(entity);
    }


}
