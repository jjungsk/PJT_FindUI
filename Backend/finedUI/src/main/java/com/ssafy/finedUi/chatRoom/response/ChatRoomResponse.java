package com.ssafy.finedUi.chatRoom.response;

import com.ssafy.finedUi.db.entity.ChatRoom;
import lombok.Getter;

@Getter
public class ChatRoomResponse {
    private Long roomId;
    private String roomName;
    private String registName;
    public ChatRoomResponse(ChatRoom entity){
        this.roomId = entity.getId();
        this.roomName = entity.getRoomName();
        this.registName = entity.getRegistInfo().getName();
    }
}
