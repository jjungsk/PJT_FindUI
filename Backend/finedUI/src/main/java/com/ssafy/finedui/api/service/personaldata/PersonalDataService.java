package com.ssafy.finedui.api.service.personaldata;

import com.ssafy.finedui.api.dto.personaldata.PersonalDataRequestDto;

public interface PersonalDataService {
    void save(PersonalDataRequestDto personalDataRequestDto);
}
