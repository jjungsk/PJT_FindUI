package com.ssafy.finedUi.chatImage.delete;

import com.ssafy.finedUi.chatImage.delete.service.ChatImageDeleteService;
import com.ssafy.finedUi.common.security.SecurityUtils;
import com.ssafy.finedUi.handler.ResponseHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/chat/image")
public class ChatImageDeleteController {

    private final ChatImageDeleteService chatImageDeleteService;

    @DeleteMapping
    public ResponseEntity<Object> delete(@RequestParam  Long userId,@RequestParam Long registId) {
        try {
            chatImageDeleteService.delete(SecurityUtils.getUserPricipal().getId(), registId);
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
        return ResponseHandler.generateResponse(true, "DELETE", HttpStatus.OK, null);
    }
}
