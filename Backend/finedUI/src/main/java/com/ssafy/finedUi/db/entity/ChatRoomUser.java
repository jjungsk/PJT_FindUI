package com.ssafy.finedUi.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@NoArgsConstructor
@Getter
@Entity
@Table(name = "participant")
public class ChatRoomUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="participant_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="room_id")
    private ChatRoom chatRoom;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    @Builder
    public ChatRoomUser(User user,ChatRoom chatRoom) {
        this.user = user;
        this.chatRoom = chatRoom;
    }



}
