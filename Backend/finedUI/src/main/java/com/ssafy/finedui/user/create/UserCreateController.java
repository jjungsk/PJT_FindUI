package com.ssafy.finedui.user.create;

import com.ssafy.finedui.common.BaseResponse;
import com.ssafy.finedui.user.UserRepository;
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

@RestController
@Api(tags = {"User"}, description = "회원가입 api")
@RequestMapping("/api/user")
@Slf4j
public class UserCreateController {


    @Autowired
    UserCreateService userCreateService;

    @Autowired
    UserRepository userRepository;

    @ApiOperation(value = "회원가입", notes = "유효성검사 후 데이터 insert. 유효하지 않다면 에러.")
    @PostMapping("/create")
    ResponseEntity<?> create(@RequestBody UserJoinRequest joinRequest) {

        log.info("회원가입 :  ");

        userCreateService.createUser(joinRequest);

        return ResponseEntity.status(200).body(new BaseResponse("success", "회원가입성공!"));
    }


//    휴대폰인증 : redis 이슈
}
