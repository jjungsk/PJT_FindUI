package com.ssafy.finedui.user.create;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SMSMessage {
    private String to;
    private String content;

    public SMSMessage(String to){
        this.to = to;
    }

}
