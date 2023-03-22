package com.ssafy.finedUi.api.service.personalData;

import com.ssafy.finedUi.api.dto.personalData.PersonalDataRequestDto;
import com.ssafy.finedUi.api.dto.personalData.PersonalDataResponseDto;
import com.ssafy.finedUi.api.service.PersonalImage.PersonalImageServiceImpl;
import com.ssafy.finedUi.db.repository.PersonalDataRepository;
import com.ssafy.finedUi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@Transactional
@RequiredArgsConstructor
public class PersonalDataServiceImpl implements PersonalDataService{
    // 실종(사전)정보 repository
    private final PersonalDataRepository personalDataRepository;
    // 실종(사전) 정보 service
    private final PersonalImageServiceImpl personalImageService;
    // 사용자 repository
    private final UserRepository userRepository;

    @Override
    public void save(PersonalDataRequestDto personalDataRequestDto) {
        // user
        Long userId = personalDataRequestDto.getUserId();
        // userId로 user를 조회하여 dto에 user 할당
        personalDataRequestDto.setUser(userRepository.findById(userId).get());
        // 생성 날짜가 비어있을 경우 할당하기
        if (personalDataRequestDto.getCreateDate() == null) {
            personalDataRequestDto.setCreateDate(Timestamp.valueOf(LocalDateTime.now()));
        }
        // 이미지 파일 배열 생성
        MultipartFile[] multipartFiles = {personalDataRequestDto.getFrontImage(), personalDataRequestDto.getOtherImage1(), personalDataRequestDto.getOtherImage2()};
        // 이미지 저장 경로들 filePaths에 할당
        String[] filePaths = personalImageService.save(multipartFiles, userId);
        // 각 이미지들에 맞게 파일 경로 할당
        personalDataRequestDto.setFrontImagePath(filePaths[0]);
        personalDataRequestDto.setOtherImage1Path(filePaths[1]);
        personalDataRequestDto.setOtherImage2Path(filePaths[2]);
        // dto를 entity로 변환하여 저장
        personalDataRepository.save(personalDataRequestDto.toEntity());
    }

    @Override
    public void delete(Long id) {
        PersonalDataResponseDto personalDataResponseDto = new PersonalDataResponseDto(personalDataRepository.findById(id).get());
        personalDataRepository.delete(personalDataResponseDto.toEntity()); // 실종(사전) 데이터 db에서 삭제
    }

    @Override
    // id 기준으로 조회
    public PersonalDataResponseDto findById(Long id) {
        return new PersonalDataResponseDto(personalDataRepository.findById(id).get());
    }
}
