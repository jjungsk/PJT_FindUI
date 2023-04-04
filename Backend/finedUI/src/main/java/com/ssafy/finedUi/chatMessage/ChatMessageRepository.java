package com.ssafy.finedUi.chatMessage;

import com.ssafy.finedUi.db.entity.ChatMessage;
import com.ssafy.finedUi.db.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    /** ChatMessage 목록조회 - 기본정렬순, ChatRoom 검색 */
    List<ChatMessage> findAllByChatRoom(ChatRoom chatRoom);
}
