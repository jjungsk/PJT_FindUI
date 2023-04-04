package com.ssafy.finedui.chat.response;

import com.ssafy.finedui.db.entity.ChatRoom;

public class ChatRoomCreateResponse {
    private Long roomId;
    private String roomName;

    public ChatRoomCreateResponse(ChatRoom entity){
        this.roomId = entity.getRoomId();
        this.roomName = entity.getRoomName();
    }
}
