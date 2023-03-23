package com.ssafy.finedUi.api.dto.ChatImage;

import com.ssafy.finedUi.db.entity.ChatImage;
import com.ssafy.finedUi.db.entity.ChatImageId;
import com.ssafy.finedUi.db.entity.PersonalData;
import com.ssafy.finedUi.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChatImageResponseDto {
    private Long userId;
    private Long missingId;
    private String imagePath;

    public ChatImageResponseDto(ChatImage chatImage) {
        this.userId = chatImage.getChatImageId().getUser().getUserId();
        this.missingId = chatImage.getChatImageId().getPersonalData().getMissingId();
        this.imagePath = chatImage.getImagePath();
    }
}
