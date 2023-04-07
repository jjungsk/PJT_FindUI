package com.ssafy.finedUi.user.login;

import com.ssafy.finedUi.common.BaseResponse;
import com.ssafy.finedUi.common.jwt.Token;
import com.ssafy.finedUi.user.login.request.UserLoginRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@Slf4j
@Api(tags = {"User"}, description = "로그인 api")
public class UserLoginController {


    @Autowired
    UserLoginService userLoginService;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "아이디,비밀번호가 일치한다면 access, refresh token 반환. 일치하지 않으면 에러.")
    ResponseEntity<?> login(@RequestBody UserLoginRequest loginRequest) {

        try {
            Token token = userLoginService.login(loginRequest);

            return ResponseEntity.status(200).body(token);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("잘못된 유저 정보입니다.");
        }
    }

    @PostMapping("/token")
    @ApiOperation(value = "access 토큰유효성 검증", notes = "access토큰 검증후 만료시 451에러. 이후 refresh 토큰 만료시 452에러. 만료안됐다면 access토큰 재발급.")
    ResponseEntity<?> tokenValid() {

        return ResponseEntity.status(200).body(new BaseResponse("success", "유효한 토큰입니다."));
    }

    @PostMapping("/token/refresh")
    @ApiOperation(value = "refresh 토큰유효성 검증", notes = "만료된 access와 refresh 토큰 모두 헤더로 전송. refresh 토큰 만료시 452에러. 만료안됐다면 access토큰 재발급.")
    ResponseEntity<?> refreshTokenValid() {

        return ResponseEntity.status(200).body(new BaseResponse("success", "유효한 토큰입니다."));
    }


    @DeleteMapping("logout")
    ResponseEntity<?> logout() {
//        redis에 관련 Token 블랙리스트처리. 시간남으면 구현.
        return ResponseEntity.status(200).body(new BaseResponse("success", "로그아웃성공."));
    }


}
