package com.ssafy.finedui.common.security;

import com.ssafy.finedui.common.oauth.user.UserPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {
    public static UserPrincipal getUserPricipal() {
        //SecurityContext에 저장된 authentication에서 UserPricipal을 얻어옴.
        return (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
