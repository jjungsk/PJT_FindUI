package com.ssafy.finedui.common.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        //인가코드 전달 실패시 수행

        //클라이언트가 redirect요청한 주소를 가져옴.
        String targetUrl = CookieUtils.getCookie(request, httpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse(("/"));

        //redirect주소 생성
        targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("accessToken", "")
                .queryParam("refreshToken", "")
                .queryParam("error", exception.getLocalizedMessage())
                .build().toUriString();


        //AuthorizeRequestRepositary에서 oAuth 관련 정보 제거.
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
