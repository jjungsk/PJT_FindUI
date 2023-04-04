package com.ssafy.finedUi.chatRoomUser.request;

import com.ssafy.finedUi.db.entity.ChatRoom;
import com.ssafy.finedUi.db.entity.ChatRoomUser;
import com.ssafy.finedUi.db.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomUserRequest {
//    private User user;
    private ChatRoom chatRoom;
    @Builder
    public ChatRoomUserRequest(ChatRoom chatRoom){
//        this.user = user;
        this.chatRoom = chatRoom;
    }
    public ChatRoomUser toEntity(){
//        return ChatRoomUser.builder().user(this.user).chatRoom(this.chatRoom).build();
        return ChatRoomUser.builder().chatRoom(this.chatRoom).build();

    }

}

