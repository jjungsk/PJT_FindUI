package com.ssafy.finedUi.db.entity;

import lombok.Data;
import lombok.Getter;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Embeddable
@Getter
public class ChatImageId implements Serializable {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "missing_id")
    private RegistInfo registInfo;

}
