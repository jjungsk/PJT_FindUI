package com.ssafy.finedUi.api.controller;

import com.ssafy.finedUi.api.dto.personalData.PersonalDataRequestDto;
import com.ssafy.finedUi.api.dto.personalData.PersonalDataResponseDto;
import com.ssafy.finedUi.api.service.personalData.PersonalDataServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/missing_prevention")
public class PersonalDataController {

    private final PersonalDataServiceImpl personalDataService;

    @GetMapping(path = "")
    public PersonalDataResponseDto get(@RequestParam Long id) {
        return personalDataService.findById(id);
    }

    @PostMapping(path = "")
    // MultipartFile 을 받을 때 @RequestBody 로 받으면 오류 발생
    // [해결책]
    // 1. @RequestParam 사용 -> 받아야하는 Parameter 가 많을 시 코드 가독성이 떨어짐
    // 2. @ModelAttribute 사용! -> 코드 가독성도 유지되고 간결성도 유지됨
    public void create(@ModelAttribute PersonalDataRequestDto personalDataRequestDto) {
        personalDataService.save(personalDataRequestDto);
    }

    @PutMapping(path = "")
    public void update(@ModelAttribute PersonalDataRequestDto personalDataRequestDto) {
        personalDataService.save(personalDataRequestDto);
    }

    @DeleteMapping
    public void delete(@RequestParam Long id) {
        personalDataService.delete(id);
    }
}
