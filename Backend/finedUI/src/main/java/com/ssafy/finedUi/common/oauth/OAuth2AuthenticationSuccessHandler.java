package com.ssafy.finedUi.common.oauth;


import com.ssafy.finedUi.common.jwt.Token;
import com.ssafy.finedUi.common.jwt.TokenProvider;
import com.ssafy.finedUi.common.properties.JwtProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;


@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenProvider tokenProvider;

    private final JwtProperties jwtProperties;

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        // CustomOAuth2UserService가 에러 없이 잘 처리된경우 동작.
        String targetUrl = determineTargetUrl(request, response, authentication);
        if (response.isCommitted()) {
            logger.debug("response has already been committed. unable to redirect to " + targetUrl);
            return;
        }
        clearAuthenticationAttributes(request, response);
        // 프론트의 redirect주소로 이동.
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
//        redirect주소로 jwt 토큰 전달.
//        AuthroizationRequestRepositary에서 클라이언트가 요청한 redirect 주소 가져오기.
        Optional<String> redirectUri = CookieUtils.getCookie(request, httpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME).map(Cookie::getValue);

//        if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get()))
//        프론트 완료하면 위에걸로 변경.
        if (redirectUri.isPresent())
            throw new RuntimeException("unauthorized Redirect URI");

        String targetUri = redirectUri.orElse(getDefaultTargetUrl());

        //jwt Token을 만들어서 redirect 주소에 queryParams로 전달.
        Token token = tokenProvider.createToken(authentication);
        return UriComponentsBuilder.fromUriString(targetUri)
                .queryParam("error", "")
                .queryParam("accessToken", token.getAccessToken())
                .queryParam("refreshToken", token.getRefreshToken())
                .build().toUriString();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        //oAuth 과정에서 저장하고있던 정보들 삭제.
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean isAuthorizedRedirectUri(String uri) {
//  yml에 설정한 프론트의 redirect 주소와 client가 요구한 주소가 일치한다면 true, 아니라면 false
        URI clientRedirectUri = URI.create(uri);
        return jwtProperties.getOAuth2().getAuthorizedRedirectUris()
                .stream()
                .anyMatch(authorizedRedirectUri -> {
                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if (authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost()) && authorizedURI.getPort() == clientRedirectUri.getPort()) {
                        return true;
                    }
                    return false;
                });
    }
}
