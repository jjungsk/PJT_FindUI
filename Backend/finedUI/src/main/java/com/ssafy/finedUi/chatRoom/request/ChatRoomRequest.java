package com.ssafy.finedUi.chatRoom.request;

import com.ssafy.finedUi.db.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomRequest {
    private String roomName;

    @Builder
    public ChatRoomRequest(String roomName,Long userId){
        this.roomName = roomName;
    }
    public ChatRoom toEntity(){
        return ChatRoom.builder().roomName(this.roomName).build();
    }
    // FE에서 채팅방 이름 지어서 넘겨주기
}
