package com.ssafy.finedUi.chat;

import com.ssafy.finedUi.db.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom,Long> {
    //쓰이는 것들
    //userId가 갖고 있는 ChatRoom 목록 반환
//    List<ChatRoom> findAllByChatRoomUser_User_UserId(Long userId);
//    List<ChatRoom> findAllByChatRoomUser_IdUser(Long userId);
    @Query("select a from ChatRoom a join ChatRoomUser b on a.id = b.chatRoom.id where b.user.id=:userID")
    List<ChatRoom> findChatRoomsByUser_Id(@Param("userID")Long UserId);
}
//채팅방 목록 보여주기
//채팅방 생성하기
// 채팅방 삭제하기
//채팅방