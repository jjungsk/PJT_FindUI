package com.ssafy.finedui.user.create;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.finedui.common.BaseResponse;
import com.ssafy.finedui.user.create.request.PhoneAuthRequest;
import com.ssafy.finedui.user.create.request.PhoneConfirmRequest;
import com.ssafy.finedui.user.create.request.UserJoinRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@Api(tags = {"User"}, description = "회원가입 api")
@RequestMapping("/api/user")
@Slf4j
public class UserCreateController {

    @Autowired
    UserCreateService userCreateService;

    @ApiOperation(value = "회원가입", notes = "유효성검사 후 데이터 insert. 유효하지 않다면 에러.")
    @PostMapping("/create")
    ResponseEntity<?> create(@RequestBody UserJoinRequest joinRequest) {

        log.info("회원가입 :  ");

        userCreateService.createUser(joinRequest);

        return ResponseEntity.status(200).body(new BaseResponse("success", "회원가입성공!"));
    }


//    휴대폰인증 : redis 이슈

    @ApiOperation(value = "휴대폰 인증번호 전송. ", notes = "랜덤한 6자리 인증번호를 SMS에 전달.")
    @PostMapping("/phoneauth")
    ResponseEntity<?> phoneAuth(@RequestBody PhoneAuthRequest phoneConfirmRequest) {

        try {
            String result = userCreateService.sendSMS(phoneConfirmRequest.getPhoneNumber());
            if(result.equals("success")){
                return ResponseEntity.status(200).body(new BaseResponse("success","인증 번호를 전송"));
            }else{
                return ResponseEntity.status(200).body(new BaseResponse("fail","인증번호 전송 실패"));
            }

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (InvalidKeyException e) {
            throw new RuntimeException(e);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    @ApiOperation(value = "휴대폰 인증번호 확인. ", notes = "사용자가 입력한 인증번호가 옳은지 확인.")
    @PostMapping("/phoneconfirm")
    ResponseEntity<?> phoneConfirm(@RequestBody PhoneConfirmRequest phoneConfirmRequest){

        if(userCreateService.verifyCode(phoneConfirmRequest)){
            return ResponseEntity.status(200).body(new BaseResponse("success","휴대폰 인증 성공"));
        }
        else{
            return ResponseEntity.status(200).body(new BaseResponse("fail","휴대폰 인증 실패"));
        }

    }


}
