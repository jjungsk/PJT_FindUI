package com.ssafy.finedUi.registInfo.get;

import com.ssafy.finedUi.registInfo.get.response.RegistInfoGetResponse;
import com.ssafy.finedUi.registInfo.get.service.RegistInfoGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/regist")
@RequiredArgsConstructor
public class RegistInfoGetController {

    private final RegistInfoGetService registInfoGetService;

    @GetMapping("/{id}/detail")
    public RegistInfoGetResponse getDetail(@PathVariable(name = "id") Long registId) {
        return registInfoGetService.findById(registId);
    }

    @GetMapping("/{id}")
    public List<RegistInfoGetResponse> getAll(@PathVariable(name = "id") Long userId) {
        return registInfoGetService.findAllByUser_UserId(userId);
    }
}
