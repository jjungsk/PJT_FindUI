package com.ssafy.finedUi.common.jwt;


import com.ssafy.finedUi.common.oauth.user.UserPrincipal;
import com.ssafy.finedUi.db.entity.User;
import com.ssafy.finedUi.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Slf4j
@Service
public class CustomUserDetailService implements UserDetailsService {


    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with nameId : " + email));
        log.info(user.getEmail());
        return UserPrincipal.create(user);

//        return userRepository.findByName(username)
//                .map(this::creaetUserDetails)
//                .orElseThrow(() -> new UsernameNotFoundException(username + "DB에서 찾을수 없습니다."));
    }

//    private UserDetails creaetUserDetails(User user) {
////        is_admin에 따라 권한 따로 부여
//        GrantedAuthority grantedAuthority;
//        if (user.getIsAdmin() == 0) {
////           user
//            grantedAuthority = new SimpleGrantedAuthority("ROLE_USER");
//        } else {
////            admin
//            grantedAuthority = new SimpleGrantedAuthority("ROLE_ADMIN");
//        }
//
//        return new org.springframework.security.core.userdetails.User(
//                String.valueOf(user.getName()),
//                user.getPassword(),
//                Collections.singleton(grantedAuthority)
//
//        );
//    }
}
