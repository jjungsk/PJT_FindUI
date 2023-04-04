package com.ssafy.finedUi.chatImage.create.response;

import com.ssafy.finedUi.db.entity.ChatImage;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatImageCreateResponse {
    private Long userId;
    private Long registId;
    private String imagePath;
//    벡터결과반환

    public ChatImageCreateResponse(ChatImage chatImage) {
        this.userId = chatImage.getChatImageId().getUser().getUserId();
        this.registId = chatImage.getChatImageId().getRegistInfo().getRegistId();
        this.imagePath = chatImage.getImagePath();
    }
}
