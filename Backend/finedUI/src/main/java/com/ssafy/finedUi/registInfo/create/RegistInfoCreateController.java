package com.ssafy.finedUi.registInfo.create;

import com.ssafy.finedUi.handler.ResponseHandler;
import com.ssafy.finedUi.registInfo.create.request.RegistInfoCreateRequest;
import com.ssafy.finedUi.registInfo.create.service.RegistInfoCreateServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/regist")
public class RegistInfoCreateController {

    private final RegistInfoCreateServiceImpl registInfoCreateService;
    @PostMapping
    // MultipartFile 을 받을 때 @RequestBody 로 받으면 오류 발생
    // [해결책]
    // 1. @RequestParam 사용 -> 받아야하는 Parameter 가 많을 시 코드 가독성이 떨어짐
    // 2. @ModelAttribute 사용! -> 코드 가독성도 유지되고 간결성도 유지됨
    public ResponseEntity<Object> create(@ModelAttribute RegistInfoCreateRequest registInfoCreateRequest) {
        return ResponseHandler.generateResponse(true, "CREATED", HttpStatus.CREATED, registInfoCreateService.save(registInfoCreateRequest));
    }
}
