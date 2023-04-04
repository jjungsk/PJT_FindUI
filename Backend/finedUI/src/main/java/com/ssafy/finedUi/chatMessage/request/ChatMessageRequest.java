package com.ssafy.finedUi.chatMessage.request;

import com.ssafy.finedUi.db.entity.ChatMessage;
import com.ssafy.finedUi.db.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatMessageRequest {
    private String sender;
    private String message;
    private ChatRoom chatRoom;

    @Builder
    public ChatMessageRequest(String sender,String message,ChatRoom chatRoom){
        this.sender = sender;
        this.message = message;
        this.chatRoom = chatRoom;
    }
    public ChatMessage toEntity(){
        return ChatMessage.builder()
                .sender(this.sender)
                .message(this.message)
                .chatRoom(this.chatRoom)
                .build();
    }
}
