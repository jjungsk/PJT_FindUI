package com.ssafy.finedui.user.create;

import com.ssafy.finedui.db.entity.User;
import com.ssafy.finedui.user.UserRepository;
import com.ssafy.finedui.user.create.request.JoinRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserCreateServiceImpl implements UserCreateService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public boolean checkValid(JoinRequest joinRequest) {
        //유효성 검사. 추후 구현
        return true;
    }

    @Override
    public boolean createUser(JoinRequest joinRequest) {

        //유효성검사.

        if (!checkValid(joinRequest)) return false;

        User user = new User();
        user.setName(joinRequest.getName());
        user.setAddress(joinRequest.getAddress());
        user.setNickname(joinRequest.getNickName());
        user.setPhoneNumber(joinRequest.getPhoneNumber());
//               비밀번호 암호화
        user.setPassword(passwordEncoder.encode(joinRequest.getPassword()));
//       유일성 에러처리는 나중에 controllerAdivce로 일괄처리.
//       UX 측면에서 사용자에게 중복된 아이디라는걸 알려주기 위해 유일성 검사.

//       제약조건 위반 에러 처리는 controllerAdvice
        User temp = userRepository.save(user);
        if (temp == null) return false;
        return true;

    }
}
