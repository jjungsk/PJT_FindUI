package com.ssafy.finedUi.chatImage.create;

import com.ssafy.finedUi.chatImage.create.request.ChatImageCreateRequest;
import com.ssafy.finedUi.chatImage.create.service.ChatImageCreateService;
import com.ssafy.finedUi.handler.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat/image")
public class ChatImageCreateController {

    private final ChatImageCreateService chatImageCreateService;

    @PostMapping
    public ResponseEntity<Object> save(@ModelAttribute ChatImageCreateRequest chatImageCreateRequest) throws IOException {
        return ResponseHandler.generateResponse(true, "CREATE", HttpStatus.CREATED, chatImageCreateService.save(chatImageCreateRequest));
    }
}
