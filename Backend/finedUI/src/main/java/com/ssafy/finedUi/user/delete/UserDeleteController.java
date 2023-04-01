package com.ssafy.finedUi.user.delete;

import com.ssafy.finedUi.common.BaseResponse;
import com.ssafy.finedUi.common.oauth.user.UserPrincipal;
import com.ssafy.finedUi.common.security.SecurityUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = {"User"})
@Slf4j
public class UserDeleteController {
    //    컨벤션 보고 확인.
//    관리자가 확인하는게 좋을듯하지만 일단 바로 삭제로하기.
    @DeleteMapping("/api/withdrwal")
    @ApiOperation(value = "회원탈퇴", notes = "access 토큰에 담긴 유저 id를 삭제.")
    ResponseEntity<?> userDelete() {
        UserPrincipal userPrincipal = SecurityUtils.getUserPricipal();
        return ResponseEntity.status(200).body(new BaseResponse("success", "jwt토큰 확인용!"));
    }

}
