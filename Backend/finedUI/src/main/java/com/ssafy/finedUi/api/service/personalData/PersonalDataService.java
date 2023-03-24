package com.ssafy.finedUi.api.service.personalData;

import com.ssafy.finedUi.api.dto.personalData.PersonalDataRequestDto;
import com.ssafy.finedUi.api.dto.personalData.PersonalDataResponseDto;

import java.util.List;

public interface PersonalDataService {
    void save(PersonalDataRequestDto personalDataRequestDto);

    void delete(Long id);

    List<PersonalDataResponseDto> findAllByUser_UserId(Long id);

    PersonalDataResponseDto findById(Long id);
}
