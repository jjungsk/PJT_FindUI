package com.ssafy.finedui.user.login;

import com.ssafy.finedui.common.jwt.Token;
import com.ssafy.finedui.user.login.request.LoginRequest;

public interface UserLoginService {
    Token login(LoginRequest loginRequest);
}
