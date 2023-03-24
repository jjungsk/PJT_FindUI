package com.ssafy.user.login;

import com.ssafy.common.jwt.Token;
import com.ssafy.user.login.request.LoginRequest;

public interface UserLoginService {
    Token login(LoginRequest loginRequest);
}
