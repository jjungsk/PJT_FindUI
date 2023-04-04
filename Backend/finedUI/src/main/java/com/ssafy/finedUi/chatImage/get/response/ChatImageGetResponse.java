package com.ssafy.finedUi.chatImage.get.response;

import com.ssafy.finedUi.db.entity.ChatImage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChatImageGetResponse {
    private Long userId;
    private Long registId;
    private String imagePath;

    public ChatImageGetResponse(ChatImage chatImage) {
        this.userId = chatImage.getChatImageId().getUser().getUserId();
        this.registId = chatImage.getChatImageId().getRegistInfo().getRegistId();
        this.imagePath = chatImage.getImagePath();
    }
}
