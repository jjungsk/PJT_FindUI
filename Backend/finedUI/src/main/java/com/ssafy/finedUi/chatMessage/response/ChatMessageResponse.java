package com.ssafy.finedUi.chatMessage.response;

import com.ssafy.finedUi.db.entity.ChatMessage;
import lombok.Getter;

@Getter
public class ChatMessageResponse {
    private Long messageId;
    private String sender;
    private String message;
    public ChatMessageResponse(ChatMessage entity){
        this.messageId = entity.getId();
        this.sender = entity.getSender();
        this.message = entity.getMessage();
    }
}
