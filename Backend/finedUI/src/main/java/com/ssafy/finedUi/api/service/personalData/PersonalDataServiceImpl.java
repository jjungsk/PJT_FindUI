package com.ssafy.finedUi.api.service.personalData;

import com.ssafy.finedUi.api.dto.personalData.PersonalDataRequestDto;
import com.ssafy.finedUi.api.dto.personalData.PersonalDataResponseDto;
import com.ssafy.finedUi.db.repository.PersonalDataRepository;
import com.ssafy.finedUi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PersonalDataServiceImpl implements PersonalDataService{
    private final PersonalDataRepository personalDataRepository;
    private final UserRepository userRepository;

    @Override
    public void save(PersonalDataRequestDto personalDataRequestDto) {
        personalDataRequestDto.setUser(userRepository.findById(personalDataRequestDto.getUserId()).get());
        if (personalDataRequestDto.getCreateDate() == null) {
            personalDataRequestDto.setCreateDate(Timestamp.valueOf(LocalDateTime.now()));
        }
        personalDataRepository.save(personalDataRequestDto.toEntity());
    }

    @Override
    public PersonalDataResponseDto findById(Long id) {
        return new PersonalDataResponseDto(personalDataRepository.findById(id).get());
    }
}
