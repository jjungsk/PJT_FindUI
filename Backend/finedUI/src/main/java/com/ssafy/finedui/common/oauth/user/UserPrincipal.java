package com.ssafy.finedui.common.oauth.user;

import com.ssafy.finedui.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;


@Getter
@AllArgsConstructor
public class UserPrincipal implements OAuth2User, UserDetails {
    private Long id;
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;


    @Setter
    private Map<String, Object> attributes;


    public static UserPrincipal create(User user) {
//        user 조건에따라 권한.
        String role = user.getIsAdmin() == 1 ? "ROLL_ADMIN" : "ROLL_USER";
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));
        return new UserPrincipal(
                user.getUserIdx(),
                user.getName(),
                user.getPassword(),
                authorities,
                null
        );
    }

    public static UserPrincipal create(User user, Collection<? extends GrantedAuthority> authorities) {
//        access 토큰에서 UserPrincipal을 반환.
        return new UserPrincipal(
                user.getUserIdx(),
                user.getName(),
                user.getPassword(),
                authorities,
                null
        );
    }

    public static UserPrincipal create(User user, Map<String, Object> attributes) {
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }


    @Override
    public String getName() {
        return String.valueOf(id);
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
