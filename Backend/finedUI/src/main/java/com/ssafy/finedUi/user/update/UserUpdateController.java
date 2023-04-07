package com.ssafy.finedUi.user.update;


import com.ssafy.finedUi.handler.ResponseHandler;
import com.ssafy.finedUi.user.update.request.UserPasswordUpdateRequest;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = {"User"})
@RequestMapping("/api/user")
@Slf4j
@RequiredArgsConstructor
public class UserUpdateController {
//    컨벤션 보고 확인.

    private final UserUpdateServiceImpl userUpdateService;

    @PostMapping("/change/password")
    public ResponseEntity<Object> changePassword(@ModelAttribute UserPasswordUpdateRequest updateRequest) {
        System.out.println(updateRequest.getNewPassword());
        return ResponseHandler.generateResponse(true, "비밀번호 변경 성공!", HttpStatus.OK, userUpdateService.changePassword(updateRequest));
    }

}
