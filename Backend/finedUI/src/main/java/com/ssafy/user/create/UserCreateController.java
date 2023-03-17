package com.ssafy.user.create;

import com.ssafy.user.create.request.JoinRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = {"User/Create"}, description = "회원가입 api")
@RequestMapping("/api/user")
@Slf4j
public class UserCreateController {
    

    @ApiOperation(value = "회원가입", notes = "유효성검사 후 데이터 insert. 유효하지 않다면 에러.")
    @GetMapping("/create")
    void create(JoinRequest joinRequest) {
        log.debug("create");
//   유효성검사

//    비밀번호 암호화

//        userRepositary.save();
    }
}
