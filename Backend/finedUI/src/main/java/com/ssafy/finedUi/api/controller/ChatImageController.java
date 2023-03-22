package com.ssafy.finedUi.api.controller;

import com.ssafy.finedUi.api.dto.ChatImage.ChatImageRequestDto;
import com.ssafy.finedUi.api.service.ChatImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor // 초기화 되지 않은 final 필드나 @NotNull 필드에 대해 생성자를 자동 생성해주는 annotation
@RestController          // JSON 형태로 객체 반환
@RequestMapping(path = "/profile_image")
public class ChatImageController {
    public final ChatImageService chatImageService; // 채팅 이미지 서비스

    @PostMapping(path = "")
    public void save(@ModelAttribute ChatImageRequestDto chatImageRequestDto) throws IOException {
        chatImageService.save(chatImageRequestDto);
    }

    @PutMapping
    public void update(@ModelAttribute ChatImageRequestDto chatImageRequestDto) throws IOException{
        chatImageService.save(chatImageRequestDto);
    }

    @DeleteMapping
    public void delete(Long userId, Long personalDataId) {
        chatImageService.delete(userId, personalDataId);
    }
}
