package com.ssafy.finedUi.chatRoomUser.controller;

import com.ssafy.finedUi.chatRoomUser.request.ChatRoomUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ssafy.finedUi.chatRoomUser.service.ChatRoomUserService;
import com.ssafy.finedUi.handler.ResponseHandler;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")

public class ChatRoomUserController {
    private final ChatRoomUserService chatRoomUserService;

//    @GetMapping
//    public ResponseEntity<Object> getChatRooms(@RequestParam Long userId){
//        return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, chatRoomUserService.getAllByUser(userId));
//    }
    @PostMapping("/entrance")
    public ResponseEntity<Object> entranceRoom(@ModelAttribute ChatRoomUserRequest chatRoomUserRequest){
        return ResponseHandler.generateResponse(true,"Entrance!!", HttpStatus.OK,chatRoomUserService.save(chatRoomUserRequest));
    }

}
