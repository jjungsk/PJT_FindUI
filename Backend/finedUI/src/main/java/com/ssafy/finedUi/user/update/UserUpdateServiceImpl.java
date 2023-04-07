package com.ssafy.finedUi.user.update;

import com.ssafy.finedUi.common.oauth.user.UserPrincipal;
import com.ssafy.finedUi.common.security.SecurityUtils;
import com.ssafy.finedUi.db.entity.User;
import com.ssafy.finedUi.user.UserRepository;
import com.ssafy.finedUi.user.update.request.UserPasswordUpdateRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserUpdateServiceImpl implements UserUpdateService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Boolean changePassword(UserPasswordUpdateRequest updateRequest) {
        UserPrincipal userPrincipal = SecurityUtils.getUserPricipal();
        updateRequest.setData(userRepository.findById(userPrincipal.getId()).get());
        updateRequest.setNewPassword(passwordEncoder.encode(updateRequest.getNewPassword()));
        User user = userRepository.save(updateRequest.toEntity());
        return user != null ? true : false;
    }
}
