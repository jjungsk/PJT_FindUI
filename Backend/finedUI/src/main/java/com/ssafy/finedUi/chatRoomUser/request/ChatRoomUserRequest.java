package com.ssafy.finedUi.chatRoomUser.request;

import com.ssafy.finedUi.db.entity.ChatRoomUser;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomUserRequest {
    private Long userId;
    public ChatRoomUserRequest(ChatRoomUser chatRoomUser){
        this.userId = chatRoomUser.getUser().getId();
    }

}
