package com.ssafy.finedUi.chatImage.delete.request;

import com.ssafy.finedUi.db.entity.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ChatImageDeleteRequest {
    private Long id;
    private Long registId;
    private RegistInfo registInfo;
    private Long userId;
    private User user;
    private MultipartFile image;
    private String imagePath;

//    public ChatImageDeleteRequestDto()

    public ChatImage toEntity() {
        ChatImageId chatImageId = new ChatImageId();
        chatImageId.setUser(user);
        chatImageId.setRegistInfo(registInfo);
        return ChatImage.builder()
                .chatImageId(chatImageId)
                .imagePath(imagePath)
                .build();
    }
}
