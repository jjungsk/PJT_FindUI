package com.ssafy.finedui.api.service.personaldata;

import com.ssafy.finedui.api.dto.personaldata.PersonalDataRequestDto;
import com.ssafy.finedui.db.repository.PersonalDataRepository;
import com.ssafy.finedui.db.repository.UserRepository;
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
        System.out.println(personalDataRequestDto.getFrontImage());
        personalDataRepository.save(personalDataRequestDto.toEntity());
    }
}
