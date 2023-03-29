package com.ssafy.finedUi.chatImage.get;

import com.ssafy.finedUi.chatImage.get.service.ChatImageGetService;
import com.ssafy.finedUi.handler.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/chat/image")
public class ChatImageGetController {

    private final ChatImageGetService chatImageGetService;

    // userId : 사용자 번호
    @GetMapping(path = "/user/{id}")
    public ResponseEntity<Object> searchByUser(@PathVariable(name = "id") Long userId) {
        return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, chatImageGetService.searchByUser(userId));
    }

    // missingId : 실종(등록) 번호
    @GetMapping(path = "/chat/{id}")
    public ResponseEntity<Object> searchByTarget(@PathVariable(name = "id") Long registId) {
        return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, chatImageGetService.searchByTarget(registId));
    }
}
