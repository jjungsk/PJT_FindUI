package com.ssafy.finedUi.registInfo.delete;

import com.ssafy.finedUi.handler.ResponseHandler;
import com.ssafy.finedUi.registInfo.create.service.RegistInfoCreateServiceImpl;
import com.ssafy.finedUi.registInfo.delete.service.RegistInfoDeleteService;
import com.ssafy.finedUi.registInfo.delete.service.RegistInfoDeleteServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/regist")
public class RegistInfoDeleteController {
    private final RegistInfoDeleteServiceImpl registInfoDeleteService;

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable(name = "id") Long id) {
        try {
            registInfoDeleteService.delete(id);
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
        return ResponseHandler.generateResponse(true, "DELETE", HttpStatus.OK, null);
    }

}
