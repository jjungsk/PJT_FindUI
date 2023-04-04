package com.ssafy.finedUi.chatRoom.controller;

import com.ssafy.finedUi.chatImage.create.request.ChatImageCreateRequest;
import com.ssafy.finedUi.chatRoom.request.ChatRoomRequest;
import com.ssafy.finedUi.chatRoom.service.ChatRoomService;
import com.ssafy.finedUi.chatRoomUser.service.ChatRoomUserService;
import com.ssafy.finedUi.db.entity.ChatRoom;
import com.ssafy.finedUi.handler.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatRoomController {
    //채팅방 리스트 가져오기
    private final ChatRoomService chatRoomService;
    private final ChatRoomUserService chatRoomUserService;
    //채팅방 목록 가져오기
    @GetMapping("/rooms")
    public ResponseEntity<Object> getRoomList(@RequestParam Long userId){
        return ResponseHandler.generateResponse(true,"ok", HttpStatus.OK,chatRoomService.findAllByUserId(userId));
    }
    //채팅방 생성
    @PostMapping("/room")
    public ResponseEntity<Object> createRoom(@ModelAttribute ChatRoomRequest chatRoomRequest){
        return ResponseHandler.generateResponse(true,"CREATE",HttpStatus.OK,chatRoomService.save(chatRoomRequest));
    }
    

}
