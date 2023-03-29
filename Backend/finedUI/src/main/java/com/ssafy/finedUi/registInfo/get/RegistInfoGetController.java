package com.ssafy.finedUi.registInfo.get;

import com.ssafy.finedUi.handler.ResponseHandler;
import com.ssafy.finedUi.registInfo.get.service.RegistInfoGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/regist")
@RequiredArgsConstructor
public class RegistInfoGetController {

    private final RegistInfoGetService registInfoGetService;

    @GetMapping("/{id}/detail")
    public ResponseEntity<Object> getDetail(@PathVariable(name = "id") Long registId) {
        try {
            return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, registInfoGetService.findById(registId));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getAll(@PathVariable(name = "id") Long userId) {
        return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, registInfoGetService.findAllByUser_UserId(userId));
    }
}
