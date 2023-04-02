package com.ssafy.finedUi.chatImage.update;

import com.ssafy.finedUi.chatImage.update.request.ChatImageUpdateRequest;
import com.ssafy.finedUi.chatImage.update.response.ChatImageUpdateResponse;
import com.ssafy.finedUi.chatImage.update.service.ChatImageUpdateService;
import com.ssafy.finedUi.handler.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/chat/image")
public class ChatImageUpdateController {

    private final ChatImageUpdateService chatImageUpdateService;

    @PutMapping
    public ResponseEntity<Object> update(@ModelAttribute ChatImageUpdateRequest chatImageUpdateRequest) {
        return ResponseHandler.generateResponse(true, "UPDATE", HttpStatus.OK, chatImageUpdateService.update(chatImageUpdateRequest));

    }
}
