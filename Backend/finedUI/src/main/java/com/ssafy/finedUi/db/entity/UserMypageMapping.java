package com.ssafy.finedUi.db.entity;

//특정 컬럼만 쿼리해주는 mapping interface.
//나중에 시간되면 사용해볼것.
public interface UserMypageMapping {
    String getName();

    String getNickname();

    String getAddress();

    String getPhoneNumber();

    int getIsAdmin();

}
