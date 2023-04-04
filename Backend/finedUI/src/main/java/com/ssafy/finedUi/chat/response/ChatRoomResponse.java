package com.ssafy.finedUi.chat.response;

import com.ssafy.finedUi.db.entity.ChatRoom;
import lombok.Getter;

@Getter
public class ChatRoomResponse {
    private Long roomId;
    private String roomName;

    public ChatRoomResponse(ChatRoom entity){
        this.roomId = entity.getId();
        this.roomName = entity.getRoomName();
    }
}
