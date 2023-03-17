package com.ssafy.finedui.api.service.personaldata;

import com.ssafy.finedui.api.dto.personaldata.PersonalDataRequestDto;
import com.ssafy.finedui.api.dto.personaldata.PersonalDataResponseDto;
import lombok.NoArgsConstructor;

public interface PersonalDataService {
    void save(PersonalDataRequestDto personalDataRequestDto);

    PersonalDataResponseDto findById(Long id);


}
