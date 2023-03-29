package com.ssafy.finedUi.registInfo.update;

import com.ssafy.finedUi.handler.ResponseHandler;
import com.ssafy.finedUi.registInfo.update.request.RegistInfoUpdateRequest;
import com.ssafy.finedUi.registInfo.update.service.RegistInfoUpdateServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/regist")
@RequiredArgsConstructor
public class RegistInfoUpdateController {

    private final RegistInfoUpdateServiceImpl registInfoUpdateService;

    @PutMapping
    public ResponseEntity<Object> update(@ModelAttribute RegistInfoUpdateRequest registInfoUpdateRequest) {
        return ResponseHandler.generateResponse(true, "UPDATE", HttpStatus.OK, registInfoUpdateService.update(registInfoUpdateRequest));
    }

    @PatchMapping
    public ResponseEntity<Object> isMissingChange(@RequestParam Long registId) {
        return ResponseHandler.generateResponse(true, "CHANGE", HttpStatus.OK, registInfoUpdateService.isMissingChange(registId));
    }
}
