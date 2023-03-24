package com.ssafy.user.mypage;


import com.ssafy.common.BaseResponse;
import com.ssafy.user.mypage.request.MypageRequest;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@Api(tags = {"User"})
@RequestMapping("/api/user")
@Slf4j
public class UserMypageController {

    @GetMapping("/mypage")
    ResponseEntity<?> getMyPage(MypageRequest mypageRequest, Principal principal) {
//         본인이 등록한사람...등의 정보가 뜨도록 수정.

//        log.info("mypage controller : " + principal.getName());
        
        return ResponseEntity.status(200).body(new BaseResponse("success", "jwt토큰 확인용!"));
    }
}
