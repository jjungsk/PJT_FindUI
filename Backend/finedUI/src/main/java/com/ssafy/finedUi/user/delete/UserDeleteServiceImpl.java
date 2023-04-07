package com.ssafy.finedUi.user.delete;

import com.ssafy.finedUi.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserDeleteServiceImpl implements UserDeleteService {

    @Autowired
    UserRepository userRepository;

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
