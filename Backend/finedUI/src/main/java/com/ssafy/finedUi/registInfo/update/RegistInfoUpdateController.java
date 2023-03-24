package com.ssafy.finedUi.registInfo.update;

import com.ssafy.finedUi.registInfo.create.service.RegistInfoCreateServiceImpl;
import com.ssafy.finedUi.registInfo.update.request.RegistInfoUpdateRequest;
import com.ssafy.finedUi.registInfo.update.response.RegistInfoUpdateResponse;
import com.ssafy.finedUi.registInfo.update.service.RegistInfoUpdateServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/regist")
@RequiredArgsConstructor
public class RegistInfoUpdateController {

    private final RegistInfoUpdateServiceImpl registInfoUpdateService;

    @PutMapping
    public RegistInfoUpdateResponse update(@ModelAttribute RegistInfoUpdateRequest registInfoUpdateRequest) {
        return registInfoUpdateService.update(registInfoUpdateRequest);
    }
}
