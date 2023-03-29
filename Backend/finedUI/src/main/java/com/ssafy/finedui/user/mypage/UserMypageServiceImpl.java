package com.ssafy.finedui.user.mypage;

import com.ssafy.finedui.common.security.SecurityUtils;
import com.ssafy.finedui.db.entity.User;
import com.ssafy.finedui.user.UserRepository;
import com.ssafy.finedui.user.mypage.request.UserUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserMypageServiceImpl implements UserMypageService {
    @Autowired
    UserRepository userRepository;

    @Override
    public User getUser(long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        }
        return null;
    }

    @Override
    public User updateUser(UserUpdateRequest userUpdateRequest) {
        User user = userRepository.getReferenceById(SecurityUtils.getUserPricipal().getId());
        String name = userUpdateRequest.name;
        String nickname = userUpdateRequest.nickname;
        String address = userUpdateRequest.addreess;
        String phoneNumber = userUpdateRequest.phoneNumber;

//         원래는 유효성검증도 해야함. 시간남으면 추가할것.
        if (user != null) {
//            소셜유저의 id는 변경하면안됨.
            if (name != null && user.getSocial() == null) user.setName(name);
//            소셜유저의 nickname은 변경하면 안됨.
            if (nickname != null && user.getNickname() == null) user.setName(nickname);
            if (address != null) user.setName(address);
//           시간남으면, redis를 활용해 휴대폰인증과 연결할것.
            if (phoneNumber != null) user.setName(phoneNumber);

        }
        return user;
    }
}
