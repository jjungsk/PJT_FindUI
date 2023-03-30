package com.ssafy.finedui.user.mypage;


import com.ssafy.finedui.common.BaseResponse;
import com.ssafy.finedui.common.oauth.user.UserPrincipal;
import com.ssafy.finedui.common.security.SecurityUtils;
import com.ssafy.finedui.db.entity.User;
import com.ssafy.finedui.user.mypage.request.UserUpdateRequest;
import com.ssafy.finedui.user.mypage.response.MypageGetResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = {"User"})
@RequestMapping("/api/user")
@Slf4j
public class UserMypageController {


    @Autowired
    UserMypageService userMypageService;

    @GetMapping("/mypage")
    @ApiOperation(value = "마이페이지 정보 얻기", notes = "access 토큰에 담긴 유저 ID로 새롭게 조회.")
    ResponseEntity<?> getMyPage() {
//        securityContext에 저장한 유저정보 추출.
        UserPrincipal userPrincipal = SecurityUtils.getUserPricipal();
        log.info(userPrincipal.getName() + " " + userPrincipal.getUsername());

        User user = userMypageService.getUser(userPrincipal.getId());


        if (user == null) {
            //실패
            return ResponseEntity.status(200).body(new BaseResponse("fail", "해당 유저가 없습니다."));
        } else {
            //성공
            return ResponseEntity.status(200).body(
                    new MypageGetResponse(user.getName(), user.getNickname(), user.getAddress(), user.getPhoneNumber(), user.getIsAdmin()));
        }
    }


    @PatchMapping("/mypage")
    @ApiOperation(value = "회원 정보 업데이트", notes = "수정할 정보 입력, 유효성 검사 후 업데이트.")
    ResponseEntity<?> updateMypage(@RequestBody UserUpdateRequest userUpdateRequest) {
        log.info("회원정보 수정 :  ");
        log.info(userUpdateRequest.addreess);
        User user = userMypageService.updateUser(userUpdateRequest);
        log.info(user.getAddress());

        if (user == null) {
            //실패
            return ResponseEntity.status(200).body(new BaseResponse("fail", "해당 유저가 없습니다."));
        } else {
            return ResponseEntity.status(200).body(new MypageGetResponse(user.getName(), user.getNickname(), user.getAddress(), user.getPhoneNumber(), user.getIsAdmin()));
        }
    }


//    비밀번호찾기 : 휴대폰번호르 임시비밀번호 발급. 나중에 바꿔주기.


//    비밀번호 변경 : 나중에 만들기


}
