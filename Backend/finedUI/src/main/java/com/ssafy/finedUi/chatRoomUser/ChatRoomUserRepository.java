package com.ssafy.finedUi.chatRoomUser;

import com.ssafy.finedUi.db.entity.ChatRoom;
import com.ssafy.finedUi.db.entity.ChatRoomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomUserRepository extends JpaRepository<ChatRoomUser,Long> {
    //userId에 따라 채팅방 목록 가져오기
//    List<ChatRoom> findAllByUser(Long userId);


}
