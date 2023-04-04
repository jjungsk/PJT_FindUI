package com.ssafy.finedUi.chatRoomUser.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ssafy.finedUi.chatRoomUser.service.ChatRoomUserService;
import com.ssafy.finedUi.handler.ResponseHandler;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat/roomList")

public class ChatRoomUserController {
    private final ChatRoomUserService chatRoomUserService;

//    @GetMapping
//    public ResponseEntity<Object> getChatRooms(@RequestParam Long userId){
//        return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, chatRoomUserService.getAllByUser(userId));
//    }

}
