package com.ssafy.finedUi.chatRoom.request;

import com.ssafy.finedUi.db.entity.ChatRoom;
import com.ssafy.finedUi.db.entity.RegistInfo;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
public class ChatRoomRequest {
    private String roomName;
    private Long registId;
    private RegistInfo registInfo;
    @Builder
    public ChatRoomRequest(String roomName,Long registId){
        this.roomName = roomName;
        this.registId = registId;
    }
    public ChatRoom toEntity(){
        return ChatRoom.builder().roomName(this.roomName).registInfo(this.registInfo).build();
    }
    // FE에서 채팅방 이름 지어서 넘겨주기
}
