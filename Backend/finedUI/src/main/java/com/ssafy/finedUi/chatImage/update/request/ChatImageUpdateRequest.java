package com.ssafy.finedUi.chatImage.update.request;

import com.ssafy.finedUi.db.entity.ChatImage;
import com.ssafy.finedUi.db.entity.ChatImageId;
import com.ssafy.finedUi.db.entity.RegistInfo;
import com.ssafy.finedUi.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
public class ChatImageUpdateRequest {
    private ChatImageId chatImageId;
    private Long userId;
    private Long registId;
    private MultipartFile image;
    private String imagePath;

    public ChatImage toEntity() {
        return ChatImage.builder()
                .chatImageId(chatImageId)
                .imagePath(imagePath)
                .build();
    }
}
