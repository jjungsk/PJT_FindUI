package com.ssafy.finedUi.common.security;

import com.ssafy.finedUi.common.oauth.user.UserPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {
    public static UserPrincipal getUserPricipal() {
        //SecurityContext에 저장된 authentication에서 UserPricipal을 얻어옴.
        return (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
