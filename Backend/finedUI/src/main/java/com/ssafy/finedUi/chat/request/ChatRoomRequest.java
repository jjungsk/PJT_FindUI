package com.ssafy.finedUi.chat.request;

import com.ssafy.finedUi.db.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatRoomRequest {
    private String roomName;

    @Builder
    public ChatRoomRequest(String roomName){
        this.roomName = roomName;
    }
    public ChatRoom toEntity(){
        return ChatRoom.builder().roomName(this.roomName).build();
    }
    // FE에서 채팅방 이름 지어서 넘겨주기
}
