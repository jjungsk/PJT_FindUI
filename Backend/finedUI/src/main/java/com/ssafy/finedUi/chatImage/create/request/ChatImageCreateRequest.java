package com.ssafy.finedUi.chatImage.create.request;

import com.ssafy.finedUi.db.entity.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatImageCreateRequest {
    private ChatImageId chatImageid;
    private Long registId;
    private Long userId;
    private MultipartFile image;
    private String imagePath;

    public ChatImage toEntity() {
        return ChatImage.builder()
                .chatImageId(chatImageid)
                .imagePath(imagePath)
                .build();
    }
}
