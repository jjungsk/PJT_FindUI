package com.ssafy.finedUi.user.update.request;

import com.ssafy.finedUi.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class UserPasswordUpdateRequest {
    private Long userId;

    private String name;

    private String phoneNumber;

    private String newPassword;

    private String email;

    private String address;

    public void setData(User user) {
        this.userId = user.getUserId();
        this.name = user.getName();
        this.phoneNumber = user.getPhoneNumber();
        this.email = user.getEmail();
        this.address = user.getAddress();
    }
    public User toEntity() {
        return User.builder()
                .userId(userId)
                .name(name)
                .phoneNumber(phoneNumber)
                .password(newPassword)
                .email(email)
                .address(address)
                .build();
    }
}
