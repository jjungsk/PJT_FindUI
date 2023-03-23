package com.ssafy.finedUi.db.repository;

import com.ssafy.finedUi.api.dto.ChatImage.ChatImageResponseDto;
import com.ssafy.finedUi.db.entity.ChatImage;
import com.ssafy.finedUi.db.entity.ChatImageId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatImageRepository extends JpaRepository<ChatImage, ChatImageId> {
    List<ChatImageResponseDto> findAllByChatImageId_User_UserId(Long userId);

    List<ChatImageResponseDto> findAllByChatImageId_PersonalData_MissingId(Long missingId);

    void deleteAllByChatImageId_PersonalData_MissingId(Long missingId);

    Optional<ChatImage> findByChatImageId(ChatImageId chatImageId);

    Optional<ChatImageResponseDto> findByImagePath(String imagePath);
}
