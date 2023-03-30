package com.ssafy.finedui.user.create.request;


import com.ssafy.finedui.user.create.SMSMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SMSRequest {
    private String type;
    private String contentType;
    
    private String countryCode;
    private String from;
    private String content;
    private List<SMSMessage> messageList;

}
