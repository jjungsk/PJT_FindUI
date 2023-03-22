package com.ssafy.finedUi.api.dto.ChatImage;

import com.ssafy.finedUi.db.entity.ChatImage;
import com.ssafy.finedUi.db.entity.PersonalData;
import com.ssafy.finedUi.db.entity.User;
import com.ssafy.finedUi.db.repository.PersonalDataRepository;
import com.ssafy.finedUi.db.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@RequiredArgsConstructor
public class ChatImageRequestDto {
    private final PersonalDataRepository personalDataRepository;
    private final UserRepository userRepository;

    private Long id;
    private Long personalDataId;
    private PersonalData personalData;
    private Long userId;
    private User user;
    private MultipartFile image;
    private String imagePath;


    public ChatImage toEntity() {
        return ChatImage.builder()
                .id(id)
                .personalData(personalData)
                .user(user)
                .imagePath(imagePath)
                .build();
    }
}
