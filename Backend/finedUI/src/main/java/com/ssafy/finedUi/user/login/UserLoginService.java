package com.ssafy.finedUi.user.login;

import com.ssafy.finedUi.common.jwt.Token;
import com.ssafy.finedUi.user.login.request.UserLoginRequest;

public interface UserLoginService {
    Token login(UserLoginRequest loginRequest);
}
