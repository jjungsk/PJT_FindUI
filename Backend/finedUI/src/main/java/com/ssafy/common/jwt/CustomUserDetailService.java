package com.ssafy.common.jwt;


import com.ssafy.db.entity.User;
import com.ssafy.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailService implements UserDetailsService {


    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByName(username)
                .map(this::creaetUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(username + "DB에서 찾을수 없습니다."));
    }

    //    이게문제인듯.
    private UserDetails creaetUserDetails(User user) {
//        is_admin에 따라 권한 따로 부여
        GrantedAuthority grantedAuthority;
        if (user.getIsAdmin() == 0) {
//           user
            grantedAuthority = new SimpleGrantedAuthority("ROLE_USER");
        } else {
//            admin
            grantedAuthority = new SimpleGrantedAuthority("ROLE_ADMIN");
        }

        return new org.springframework.security.core.userdetails.User(
                String.valueOf(user.getName()),
                user.getPassword(),
                Collections.singleton(grantedAuthority)

        );
    }
}
