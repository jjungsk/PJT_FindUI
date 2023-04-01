package com.ssafy.finedUi.registInfo.get;

import com.ssafy.finedUi.handler.ResponseHandler;
import com.ssafy.finedUi.registInfo.get.service.RegistInfoGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/regist")
@RequiredArgsConstructor
public class RegistInfoGetController {

    private final RegistInfoGetService registInfoGetService;

    @GetMapping("detail")
    public ResponseEntity<Object> getDetail(@RequestParam Long registId) {
        try {
            return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, registInfoGetService.findById(registId));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @GetMapping
    public ResponseEntity<Object> getAll(@RequestParam Long userId) {
        return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, registInfoGetService.findAllByUser_UserId(userId));
    }
}
