package com.ssafy.finedUi.chat.controller;

import com.ssafy.finedUi.chat.service.ChatRoomService;
import com.ssafy.finedUi.handler.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat/rooms")
public class ChatRoomController {
    //채팅방 리스트 가져오기
    private final ChatRoomService chatRoomService;

    @GetMapping
    public ResponseEntity<Object> getRoomList(@RequestParam Long userId){
        return ResponseHandler.generateResponse(true,"ok", HttpStatus.OK,chatRoomService.findAllByUserId(userId));
    }



}
