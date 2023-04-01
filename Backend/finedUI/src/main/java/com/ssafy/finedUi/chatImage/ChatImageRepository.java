package com.ssafy.finedUi.chatImage;

import com.ssafy.finedUi.chatImage.get.response.ChatImageGetResponse;
import com.ssafy.finedUi.db.entity.ChatImage;
import com.ssafy.finedUi.db.entity.ChatImageId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatImageRepository extends JpaRepository<ChatImage, ChatImageId> {
    List<ChatImageGetResponse> findAllByChatImageId_User_UserId(Long userId); // 채팅방 목록에서 보일 이미지

    List<ChatImageGetResponse> findAllByChatImageId_RegistInfo_RegistId(Long registId); // 채팅방에서 보일 이미지(일대일, 일대다 해결)

    void deleteAllByChatImageId_RegistInfo_RegistId(Long registId); // 등록 카드 삭제 될 경우 관련된 채팅 이미지들 모두 삭제

    Optional<ChatImage> findByChatImageId(ChatImageId chatImageId); // 채팅방 이미지 삭제

    Optional<ChatImageGetResponse> findByImagePath(String imagePath);
}

