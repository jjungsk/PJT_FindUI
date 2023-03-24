package com.ssafy.finedUi.api.controller;

import com.ssafy.finedUi.api.dto.ChatImage.ChatImageRequestDto;
import com.ssafy.finedUi.api.dto.ChatImage.ChatImageResponseDto;
import com.ssafy.finedUi.api.service.ChatImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor // 초기화 되지 않은 final 필드나 @NotNull 필드에 대해 생성자를 자동 생성해주는 annotation
@RestController          // JSON 형태로 객체 반환
@RequestMapping(path = "/api/profile_image")
public class ChatImageController {
    public final ChatImageService chatImageService; // 채팅 이미지 서비스

    // userId : 사용자 번호
    @GetMapping(path = "/user")
    public List<ChatImageResponseDto> searchByUser(@RequestParam Long userId) {
        return chatImageService.searchByUser(userId);
    }

    // missingId : 실종(등록) 번호
    @GetMapping(path = "/chat")
    public List<ChatImageResponseDto> searchByTarget(@RequestParam Long missingId) {
        return chatImageService.searchByTarget(missingId);
    }

    @PostMapping(path = "")
    public void save(@ModelAttribute ChatImageRequestDto chatImageRequestDto) throws IOException {
        chatImageService.save(chatImageRequestDto);
    }

    @PutMapping
    public void update(@ModelAttribute ChatImageRequestDto chatImageRequestDto) throws IOException{
        chatImageService.save(chatImageRequestDto);
    }

    @DeleteMapping
    public void delete(@RequestParam Long userId, @RequestParam Long personalDataId) {
        chatImageService.delete(userId, personalDataId);
    }
}
