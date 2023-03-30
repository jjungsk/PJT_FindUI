package com.ssafy.finedUi.registInfo.update.service;

import com.ssafy.finedUi.db.UserRepository;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import com.ssafy.finedUi.registInfo.image.save.ImageSaveServiceImpl;
import com.ssafy.finedUi.registInfo.update.request.RegistInfoUpdateRequest;
import com.ssafy.finedUi.registInfo.update.response.RegistInfoUpdateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;

@Service
@RequiredArgsConstructor
public class RegistInfoUpdateServiceImpl implements RegistInfoUpdateService{

    private final RegistInfoRepository registInfoRepository;
    private final UserRepository userRepository;
    private final ImageSaveServiceImpl imageSaveService;

    @Override
    public RegistInfoUpdateResponse update(RegistInfoUpdateRequest registInfoUpdateRequest) {
        registInfoUpdateRequest.setUser(userRepository.findById(registInfoUpdateRequest.getUserId()).get());
        registInfoUpdateRequest.setCreateDate((registInfoRepository.findById(registInfoUpdateRequest.getRegistId())).get().getCreateDate());
        Integer longitude = registInfoUpdateRequest.getLongitude();
        Integer latitude = registInfoUpdateRequest.getLatitude();
        if (longitude != null && latitude != null) {
            Point missingLocation = new Point(longitude, latitude);
            registInfoUpdateRequest.setMissingLocation(missingLocation);
        }
        MultipartFile[] multipartFiles = {registInfoUpdateRequest.getFrontImage(), registInfoUpdateRequest.getOtherImage1(), registInfoUpdateRequest.getOtherImage2()};
        String[] imagePaths = imageSaveService.save(multipartFiles, registInfoUpdateRequest.getRegistId());
        registInfoUpdateRequest.setFrontImagePath(imagePaths[0]);
        registInfoUpdateRequest.setOtherImage1Path(imagePaths[1]);
        registInfoUpdateRequest.setOtherImage2Path(imagePaths[2]);
        return new RegistInfoUpdateResponse(registInfoRepository.save(registInfoUpdateRequest.toEntity()));
    }

    // 실종 변경
    @Override
    public RegistInfoUpdateResponse isMissingChange(Long registId, Integer longitude, Integer latitude) {
        RegistInfoUpdateRequest registInfoUpdateRequest = new RegistInfoUpdateRequest(registInfoRepository.findById(registId).get());
        Boolean isMissing = !registInfoUpdateRequest.getIsMissing();
        registInfoUpdateRequest.setIsMissing(isMissing);
        if (isMissing) {
            Point missingLocation = new Point(longitude, latitude);
            registInfoUpdateRequest.setMissingLocation(missingLocation);
        }
        registInfoUpdateRequest.setUser(userRepository.findById(registInfoUpdateRequest.getUserId()).get());
        return new RegistInfoUpdateResponse(registInfoRepository.save(registInfoUpdateRequest.toEntity()));
    }
}
