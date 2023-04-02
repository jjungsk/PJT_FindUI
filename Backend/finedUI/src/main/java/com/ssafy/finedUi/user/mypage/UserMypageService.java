package com.ssafy.finedUi.user.mypage;

import com.ssafy.finedUi.db.entity.User;
import com.ssafy.finedUi.user.mypage.request.UserUpdateRequest;


//특정 컬럼만 받도록 해주는 매핑클래스.
public interface UserMypageService {
    User getUser(long id);

    User updateUser(UserUpdateRequest userUpdateRequest);


}
