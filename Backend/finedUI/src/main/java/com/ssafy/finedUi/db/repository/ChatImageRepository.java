package com.ssafy.finedUi.db.repository;

import com.ssafy.finedUi.api.dto.ChatImage.ChatImageResponseDto;
import com.ssafy.finedUi.db.entity.ChatImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatImageRepository extends JpaRepository<ChatImage, Long> {
    Optional<ChatImageResponseDto> findByUser_UserIdxAndPersonalData_MissingIdx(Long userId, Long missingId);

    Optional<ChatImageResponseDto> findByImagePath(String imagePath);
}
