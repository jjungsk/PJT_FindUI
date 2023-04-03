package com.ssafy.finedUi.registInfo.update.service;

import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import com.ssafy.finedUi.registInfo.image.save.ImageSaveServiceImpl;
import com.ssafy.finedUi.registInfo.update.request.RegistInfoUpdateRequest;
import com.ssafy.finedUi.registInfo.update.response.RegistInfoUpdateResponse;
import com.ssafy.finedUi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RegistInfoUpdateServiceImpl implements RegistInfoUpdateService {

    private final RegistInfoRepository registInfoRepository;
    private final UserRepository userRepository;
    private final ImageSaveServiceImpl imageSaveService;

    @Override
    public RegistInfoUpdateResponse update(RegistInfoUpdateRequest registInfoUpdateRequest) {
        registInfoUpdateRequest.setUser(userRepository.findById(registInfoUpdateRequest.getUserId()).get());
        registInfoUpdateRequest.setCreateDate((registInfoRepository.findById(registInfoUpdateRequest.getRegistId())).get().getCreateDate());
//        Integer longitude = registInfoUpdateRequest.getLongitude();
//        Integer latitude = registInfoUpdateRequest.getLatitude();
//        if (longitude != null && latitude != null) {
//            Point missingLocation = new Point(longitude, latitude);
//            registInfoUpdateRequest.setMissingLocation(missingLocation);
//            registInfoUpdateRequest.setIsMissing(true);
//        } else {
//            registInfoUpdateRequest.setIsMissing(false);
//        }
        MultipartFile[] multipartFiles = {registInfoUpdateRequest.getFrontImage(), registInfoUpdateRequest.getOtherImage1(), registInfoUpdateRequest.getOtherImage2()};
        String[] imagePaths = imageSaveService.save(multipartFiles, registInfoUpdateRequest.getRegistId());
        registInfoUpdateRequest.setFrontImagePath(imagePaths[0]);
        registInfoUpdateRequest.setOtherImage1Path(imagePaths[1]);
        registInfoUpdateRequest.setOtherImage2Path(imagePaths[2]);
        return new RegistInfoUpdateResponse(registInfoRepository.save(registInfoUpdateRequest.toEntity()));
    }

    // 실종 변경
    @Override
    public RegistInfoUpdateResponse isMissingChange(Long registId, Double longitude, Double latitude) {
        RegistInfoUpdateRequest registInfoUpdateRequest = new RegistInfoUpdateRequest(registInfoRepository.findById(registId).get());
        Boolean isMissing = !registInfoUpdateRequest.getIsMissing();
        registInfoUpdateRequest.setIsMissing(isMissing);
        // 실종 신고한 경우
        if (isMissing) {
            registInfoUpdateRequest.setLongitude(longitude);                    // 경도 설정
            registInfoUpdateRequest.setLatitude(latitude);                      // 위도 설정
            registInfoUpdateRequest.setMissingTime(Timestamp.valueOf(LocalDateTime.now())); // 실종 시간 설정
        // 실종 신고 하지 않은 경우
        } else {
            registInfoUpdateRequest.setLongitude(null);                         // 경도 설정
            registInfoUpdateRequest.setLatitude(null);                          // 위도 설정
            registInfoUpdateRequest.setMissingTime(null); // 실종 시간 설정
        }
        registInfoUpdateRequest.setUser(userRepository.findById(registInfoUpdateRequest.getUserId()).get());
        return new RegistInfoUpdateResponse(registInfoRepository.save(registInfoUpdateRequest.toEntity()));
    }
}
