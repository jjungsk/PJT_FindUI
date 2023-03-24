package com.ssafy.finedUi.registInfo.update.service;

import com.ssafy.finedUi.db.repository.UserRepository;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import com.ssafy.finedUi.registInfo.image.delete.ImageDeleteServiceImpl;
import com.ssafy.finedUi.registInfo.image.save.ImageSaveServiceImpl;
import com.ssafy.finedUi.registInfo.update.request.RegistInfoUpdateRequest;
import com.ssafy.finedUi.registInfo.update.response.RegistInfoUpdateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class RegistInfoUpdateServiceImpl implements RegistInfoUpdateService{

    private final RegistInfoRepository registInfoRepository;
    private final UserRepository userRepository;
    private final ImageSaveServiceImpl imageSaveService;
    private final ImageDeleteServiceImpl imageDeleteService;

    @Override
    public RegistInfoUpdateResponse update(RegistInfoUpdateRequest registInfoUpdateRequest) {
        registInfoUpdateRequest.setUser(userRepository.findById(registInfoUpdateRequest.getUserId()).get());
        MultipartFile[] multipartFiles = {registInfoUpdateRequest.getFrontImage(), registInfoUpdateRequest.getOtherImage1(), registInfoUpdateRequest.getOtherImage2()};
        String[] imagePaths = imageSaveService.save(multipartFiles, registInfoUpdateRequest.getUserId());
        registInfoUpdateRequest.setFrontImagePath(imagePaths[0]);
        registInfoUpdateRequest.setOtherImage1Path(imagePaths[1]);
        registInfoUpdateRequest.setOtherImage2Path(imagePaths[2]);
        return new RegistInfoUpdateResponse(registInfoRepository.save(registInfoUpdateRequest.toEntity()));
    }
}
