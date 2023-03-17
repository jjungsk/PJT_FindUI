package com.ssafy.user.create;

import com.ssafy.user.create.request.JoinRequest;

public interface UserCreateService {
    boolean checkValid(JoinRequest joinRequest);

    boolean createUser(JoinRequest joinRequest);

}
