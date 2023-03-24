package com.ssafy.finedUi.registInfo.delete;

import com.ssafy.finedUi.registInfo.create.service.RegistInfoCreateServiceImpl;
import com.ssafy.finedUi.registInfo.delete.service.RegistInfoDeleteService;
import com.ssafy.finedUi.registInfo.delete.service.RegistInfoDeleteServiceImpl;
import lombok.RequiredArgsConstructor;
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
    public void delete(@PathVariable(name = "id") Long id) {
        registInfoDeleteService.delete(id);
    }

}
