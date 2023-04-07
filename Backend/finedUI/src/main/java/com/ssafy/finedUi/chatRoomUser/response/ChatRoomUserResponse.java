package com.ssafy.finedUi.chatRoomUser.response;

import com.ssafy.finedUi.db.entity.ChatRoomUser;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomUserResponse {
    private Long roomId;
    private String roomName;
    public ChatRoomUserResponse(ChatRoomUser chatRoomUser){
        this.roomId = chatRoomUser.getChatRoom().getId();
        this.roomName = chatRoomUser.getChatRoom().getRoomName();
    }

}
