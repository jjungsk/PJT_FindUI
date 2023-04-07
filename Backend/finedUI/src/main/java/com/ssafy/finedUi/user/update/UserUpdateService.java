package com.ssafy.finedUi.user.update;

import com.ssafy.finedUi.user.update.request.UserPasswordUpdateRequest;

public interface UserUpdateService {
    Boolean changePassword(UserPasswordUpdateRequest updateRequest);
}
