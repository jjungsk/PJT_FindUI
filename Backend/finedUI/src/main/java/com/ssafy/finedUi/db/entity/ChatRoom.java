package com.ssafy.finedUi.db.entity;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
@NoArgsConstructor
@Getter
@Entity
@Table(name="chat_room")
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;
    @Column(name = "room_name")
    private String roomName; //실종자 이름+'제보방'

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatRoomUser> chatRoomUser;
    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.REMOVE)
    private List<ChatMessage> chatMessageList;
    @OneToOne
    @JoinColumn(name="regist_id")
    private RegistInfo registInfo;
    @Builder
    public ChatRoom(String roomName,RegistInfo registInfo) {
        this.roomName = roomName;
        this.registInfo = registInfo;
    }
    
}
