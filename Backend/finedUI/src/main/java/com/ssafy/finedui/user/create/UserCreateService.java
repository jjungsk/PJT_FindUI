package com.ssafy.finedui.user.create;

import com.ssafy.finedui.user.create.request.UserJoinRequest;

public interface UserCreateService {
    boolean checkValid(UserJoinRequest joinRequest);

    boolean createUser(UserJoinRequest joinRequest);

}
