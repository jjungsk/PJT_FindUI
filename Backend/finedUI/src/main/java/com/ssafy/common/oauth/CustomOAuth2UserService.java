package com.ssafy.common.oauth;


import com.ssafy.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.stereotype.Service;


//accessToken
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
//
////      accessToken 및 oAuth 사용자 정보는 oAuth2UserRequest에 있음.
//        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
//
//        try {
//            return processOAuth2User(oAuth2UserRequest, oAuth2User);
//        } catch (AuthenticationException ex) {
//            throw ex;
//        } catch (Exception ex) {
//            throw new InternalAuthenticationServiceException(ex.getMessage());
//        }
//    }
//
//    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
//
//
//        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
//        if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
//            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
//        }
//
//        Optional<User> userOptional = userRepository.findByName(oAuth2UserInfo.getEmail());
//        User user;
//        if (userOptional.isPresent()) {
//            //기존에 존재하던 유저인경우.
//            //AuthProvider 구분을 안하도록 설계해서 일단 생략? registration ?
//            user = userOptional.get();
//            if (!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
//                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
//                        user.getProvider() + " account. Please use your " + user.getProvider() +
//                        " account to login.");
//            }
//            user = updateExistingUser(user, oAuth2UserInfo);
//        } else {
//            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
//        }
//
//        return UserPrincipal.create(user, oAuth2User.getAttributes());
//    }
}
