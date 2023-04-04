package com.ssafy.finedUi.db.entity;

import lombok.*;


import javax.persistence.*;
@NoArgsConstructor
@Getter
@Setter
@Table(name="chat_message")
@Entity
public class ChatMessage {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Id
    private Long id;
    @Column(name = "message_type")
    private MessageType messageType;
    @Column(name = "message")

    private String message;
    @Column(name = "sender")

    private String sender;
    @ManyToOne
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;


    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }
    @Builder
    public ChatMessage(String sender, String message, ChatRoom chatRoom) {
        this.sender = sender;
        this.messageType = messageType;
        this.message = message;
        this.chatRoom = chatRoom;
    }
}