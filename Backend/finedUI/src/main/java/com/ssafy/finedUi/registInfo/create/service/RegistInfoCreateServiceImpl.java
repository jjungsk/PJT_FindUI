package com.ssafy.finedUi.registInfo.create.service;

import com.ssafy.finedUi.db.UserRepository;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import com.ssafy.finedUi.registInfo.create.request.RegistInfoCreateRequest;
import com.ssafy.finedUi.registInfo.create.response.RegistInfoCreateResponse;
import com.ssafy.finedUi.registInfo.image.save.ImageSaveServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistInfoCreateServiceImpl implements RegistInfoCreateService {
    // 실종(사전)정보 repository
    private final RegistInfoRepository registInfoRepository;
    // 실종(사전) 정보 service
    private final UserRepository userRepository;
    // 이미지 저장 service
    private final ImageSaveServiceImpl imageSaveService;

    // 등록 정보 저장 메소드
    @Override
    public RegistInfoCreateResponse save(RegistInfoCreateRequest registInfoCreateRequest) {
        // user
        Long userId = registInfoCreateRequest.getUserId();
        // userId로 user를 조회하여 dto에 user 할당
        registInfoCreateRequest.setUser(userRepository.findById(userId).get());
        // 좌표값 할당
        Integer longitude = registInfoCreateRequest.getLongitude();
        Integer latitude = registInfoCreateRequest.getLatitude();
        if (longitude != null && latitude != null) {
            Point missingLocation = new Point(latitude, latitude);
            registInfoCreateRequest.setIsMissing(true); // 실종 여부
            registInfoCreateRequest.setMissingLocation(missingLocation); // 실종 위치
            registInfoCreateRequest.setMissingTime(Timestamp.valueOf(LocalDateTime.now())); // 실종 시간
        }

        // 생성 날짜가 비어있을 경우 할당하기
//        if (registInfoCreateRequest.getCreateDate() == null) {
//            registInfoCreateRequest.setCreateDate(Timestamp.valueOf(LocalDateTime.now()));
//        }
        // 이미지 파일 배열 생성
        MultipartFile[] multipartFiles = {registInfoCreateRequest.getFrontImage(), registInfoCreateRequest.getOtherImage1(), registInfoCreateRequest.getOtherImage2()};
        // 이미지 저장 경로들 filePaths에 할당
        String[] filePaths = imageSaveService.save(multipartFiles, userId);
        // 각 이미지들에 맞게 파일 경로 할당
        registInfoCreateRequest.setFrontImagePath(filePaths[0]);
        registInfoCreateRequest.setOtherImage1Path(filePaths[1]);
        registInfoCreateRequest.setOtherImage2Path(filePaths[2]);
        // dto를 entity로 변환하여 저장
        return new RegistInfoCreateResponse(registInfoRepository.save(registInfoCreateRequest.toEntity()));
    }
}
