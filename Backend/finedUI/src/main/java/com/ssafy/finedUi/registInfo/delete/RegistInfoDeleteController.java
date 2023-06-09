package com.ssafy.finedUi.registInfo.delete;

import com.ssafy.finedUi.handler.ResponseHandler;
import com.ssafy.finedUi.registInfo.create.service.RegistInfoCreateServiceImpl;
import com.ssafy.finedUi.registInfo.delete.service.RegistInfoDeleteService;
import com.ssafy.finedUi.registInfo.delete.service.RegistInfoDeleteServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/regist")
public class RegistInfoDeleteController {
    private final RegistInfoDeleteServiceImpl registInfoDeleteService;

    @DeleteMapping
    public ResponseEntity<Object> delete(@RequestParam Long registId) {
        try {
            registInfoDeleteService.delete(registId);
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
        return ResponseHandler.generateResponse(true, "DELETE", HttpStatus.OK, null);
    }

}
