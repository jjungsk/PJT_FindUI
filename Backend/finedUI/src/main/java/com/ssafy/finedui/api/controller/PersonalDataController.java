package com.ssafy.finedui.api.controller;

import com.ssafy.finedui.api.dto.personaldata.PersonalDataRequestDto;
import com.ssafy.finedui.api.dto.personaldata.PersonalDataResponseDto;
import com.ssafy.finedui.api.service.personaldata.PersonalDataServiceImpl;
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
    public void create(@RequestBody PersonalDataRequestDto personalDataRequestDto){
        personalDataService.save(personalDataRequestDto);
    }

    @PutMapping(path = "")
    public void update(@RequestBody PersonalDataRequestDto personalDataRequestDto) {
        personalDataService.save(personalDataRequestDto);
    }
}
