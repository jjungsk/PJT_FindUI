package com.ssafy.finedUi.user.login;

import com.ssafy.finedUi.common.BaseResponse;
import com.ssafy.finedUi.common.jwt.Token;
import com.ssafy.finedUi.user.login.request.UserLoginRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


        Token token = userLoginService.login(loginRequest);

        return ResponseEntity.status(200).body(token);

    }

    @PostMapping("/token")
    @ApiOperation(value = "토큰유효성 검증", notes = "access토큰 검증후 만료시 451에러. 이후 refresh 토큰 만료시 452에러. 만료안됐다면 access토큰 재발급.")
    ResponseEntity<?> tokenValid() {

        return ResponseEntity.status(200).body(new BaseResponse("sucess", "유효한 토큰입니다."));
    }

}
