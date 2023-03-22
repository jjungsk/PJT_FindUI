package com.ssafy.finedUi.api.dto.ChatImage;

import com.ssafy.finedUi.db.entity.ChatImage;
import com.ssafy.finedUi.db.entity.PersonalData;
import com.ssafy.finedUi.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChatImageResponseDto {
    private Long id;
    private PersonalData personalData;
    private User user;
    private String imagePath;

    public ChatImage toEntity() {
        return ChatImage.builder()
                .id(id)
                .user(user)
                .personalData(personalData)
                .imagePath(imagePath)
                .build();
    }
}
