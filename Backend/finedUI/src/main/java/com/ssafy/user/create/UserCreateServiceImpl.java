package com.ssafy.user.create;

import com.ssafy.db.entity.User;
import com.ssafy.user.UserRepository;
import com.ssafy.user.create.request.JoinRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("UserCreateService")
public class UserCreateServiceImpl implements UserCreateService {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean checkValid(JoinRequest joinRequest) {
        //유효성 검사.
        return true;
    }

    @Override
    public boolean createUser(JoinRequest joinRequest) {

        //유효성검사.
        if (checkValid(joinRequest)) {
            //비밀번호 암호화.
            User user = new User();
//            null값은 어떻게 처리?
            return true;
        }
        return false;
    }
}
