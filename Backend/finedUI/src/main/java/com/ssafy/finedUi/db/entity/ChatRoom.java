package com.ssafy.finedui.chat.db.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;
@Entity
@Data
public class ChatRoom {


    @Id
    @GeneratedValue
    private String roomId;
    private String name; //실종자 이름+'제보방'
    
    public static ChatRoom create(String name){
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.name = name;
        return chatRoom;
    }
    
}
