package com.ssafy.finedUi.user.mypage;

import com.ssafy.finedUi.common.security.SecurityUtils;
import com.ssafy.finedUi.db.entity.User;
import com.ssafy.finedUi.user.UserRepository;
import com.ssafy.finedUi.user.mypage.request.UserUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public User updateUser(UserUpdateRequest userUpdateRequest) {
        //update 정보 유효성 검사 필요.
        User user = userRepository.getReferenceById(SecurityUtils.getUserPricipal().getId());
        String name = userUpdateRequest.name;
        String email = userUpdateRequest.email;
        String address = userUpdateRequest.address;
        String phoneNumber = userUpdateRequest.phoneNumber;

//         유효성검증도 시간남으면 추가할것.
        if (user != null) {
//            소셜유저의 id는 변경하면안됨. 시간남으면 관련 에러 추가.
            if (email != null && user.getSocial() == null) user.setEmail(email);
//            소셜유저의 name은 변경하면 안됨.시간남으면 관련 에러 추가.
            if (name != null && user.getSocial() == null) user.setName(name);
            if (address != null) user.setAddress(address);
////           시간남으면, redis를 활용해 휴대폰인증과 연결할것.
            if (phoneNumber != null) user.setPhoneNumber(phoneNumber);

        }

        return user;
    }
}
