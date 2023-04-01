package com.ssafy.finedUi.user.create;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.finedUi.user.create.request.PhoneConfirmRequest;
import com.ssafy.finedUi.user.create.request.UserJoinRequest;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public interface UserCreateService {
    boolean checkValid(UserJoinRequest joinRequest);

    boolean createUser(UserJoinRequest joinRequest);

    String sendSMS(String recipientPhoneNumber) throws JsonProcessingException,
            UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, URISyntaxException;

    boolean verifyCode(PhoneConfirmRequest phoneConfirmRequest);
}
