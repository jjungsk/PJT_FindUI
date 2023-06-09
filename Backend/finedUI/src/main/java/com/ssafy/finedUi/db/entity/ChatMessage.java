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
    @Column(name = "message_id")
    @Id
    private Long id;
    @Column(name = "message_type")
    private MessageType type;
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
        this.type = type;
        this.message = message;
        this.chatRoom = chatRoom;
    }
}