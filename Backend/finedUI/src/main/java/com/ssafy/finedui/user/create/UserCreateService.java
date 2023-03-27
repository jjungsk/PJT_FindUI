package com.ssafy.finedui.user.create;

import com.ssafy.finedui.user.create.request.JoinRequest;

public interface UserCreateService {
    boolean checkValid(JoinRequest joinRequest);

    boolean createUser(JoinRequest joinRequest);

}
