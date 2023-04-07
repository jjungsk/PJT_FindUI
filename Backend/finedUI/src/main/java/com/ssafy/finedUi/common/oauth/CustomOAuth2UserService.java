package com.ssafy.finedUi.common.oauth;


import com.ssafy.finedUi.common.oauth.exception.OAuth2AuthenticationProcessingException;
import com.ssafy.finedUi.common.oauth.user.AuthProvider;
import com.ssafy.finedUi.common.oauth.user.OAuth2UserInfo;
import com.ssafy.finedUi.common.oauth.user.OAuth2UserInfoFactory;
import com.ssafy.finedUi.common.oauth.user.UserPrincipal;
import com.ssafy.finedUi.common.properties.JwtProperties;
import com.ssafy.finedUi.db.entity.Social;
import com.ssafy.finedUi.db.entity.User;
import com.ssafy.finedUi.social.SocialRepository;
import com.ssafy.finedUi.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Optional;


//accessToken
@Service
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SocialRepository socialRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {

//      accessToken 및 oAuth 사용자 정보는 oAuth2UserRequest에 있어 뽑아옴.
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {

        log.info("processOAuth2User ------------: " + oAuth2User.getAttributes().toString());

        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        //oAuth email이 곧 id(name).
        //priovider정보도 검사해야하는지?
        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        if (userOptional.isPresent()) {
            //기존에 존재하던 유저인경우 정보 update.
            user = userOptional.get();
            log.info(user.getSocial().getProvider());
            log.info(oAuth2UserRequest.getClientRegistration().getRegistrationId());
            if(user.getSocial().getProvider().equals(oAuth2UserRequest.getClientRegistration().getRegistrationId())){
                log.info("같은디..");
            }

//            if (!user.getSocial().getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
            if (!user.getSocial().getProvider().equals(oAuth2UserRequest.getClientRegistration().getRegistrationId())) {
//                클라이언트가 요구한 proivder와 연결된 provider가 일치하지않으면 에러.
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getSocial().getProvider() + " account. Please use your " + user.getSocial().getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            //기존에 없다면 회원가입.
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        return userRepository.save(existingUser);
    }


    @Transactional
    public User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        log.info("oAuth 사용자 등록 : " + oAuth2UserInfo.getAttributes().toString());
        User user = new User();
//        참고코드 :
//        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
//        user.setProviderId(oAuth2UserInfo.getId());
//        user.setName(oAuth2UserInfo.getName());
//        user.setEmail(oAuth2UserInfo.getEmail());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setName(oAuth2UserInfo.getName());
//        provider 정보 등록.
//        jpql을 이용한 subquery 사용이 훨씬 깔끔함. 나중에 수정할것.
        String provider = oAuth2UserRequest.getClientRegistration().getRegistrationId();
        log.info("oAuth 요청한 provider : " + provider);
        Optional<Social> social = socialRepository.findByProvider(provider);
        user.setSocial(social.get());

        return userRepository.save(user);
    }

}
