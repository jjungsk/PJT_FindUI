package com.ssafy.finedUi.registInfo.create.service;

import com.ssafy.finedUi.db.entity.RegistInfo;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import com.ssafy.finedUi.registInfo.aiserever.AiServerUtils;
import com.ssafy.finedUi.registInfo.create.request.RegistInfoCreateRequest;
import com.ssafy.finedUi.registInfo.create.response.RegistInfoCreateResponse;
import com.ssafy.finedUi.registInfo.image.save.ImageSaveServiceImpl;
import com.ssafy.finedUi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.net.ssl.HttpsURLConnection;
import java.awt.*;
import java.net.URL;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

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

    @Autowired
    private AiServerUtils aiServerUtils;
    // 등록 정보 저장 메소드
    @Override
    public RegistInfoCreateResponse save(RegistInfoCreateRequest registInfoCreateRequest) {
        // user
        Long userId = registInfoCreateRequest.getUserId();
        System.out.println(userId);
        // userId로 user를 조회하여 dto에 user 할당
        System.out.println(userRepository.findById(userId).get().getUserId());
        registInfoCreateRequest.setUser(userRepository.findById(userId).get());
        // 좌표값 할당
        Double longitude = registInfoCreateRequest.getLongitude();
        Double latitude = registInfoCreateRequest.getLatitude();
        MultipartFile[] multipartFiles = {registInfoCreateRequest.getFrontImage(), registInfoCreateRequest.getOtherImage1(), registInfoCreateRequest.getOtherImage2()};
        // 이미지 저장 경로들 filePaths에 할당
        List<RegistInfo> registInfoList = registInfoRepository.findAll();
        int idx = registInfoList.size() - 1;
        Long registId = idx < 0 ? 1 : registInfoList.get(idx).getRegistId() + 1;
        String[] filePaths = imageSaveService.save(multipartFiles, registId);
        // 각 이미지들에 맞게 파일 경로 할당
        registInfoCreateRequest.setFrontImagePath(filePaths[0]);
        registInfoCreateRequest.setOtherImage1Path(filePaths[1]);
        registInfoCreateRequest.setOtherImage2Path(filePaths[2]);
        // dto를 entity로 변환하여 저장

        RegistInfo registInfo = registInfoRepository.save(registInfoCreateRequest.toEntity());
        
//        실종됐고, 이미지가 있을때만 벡터저장.
        if(registInfo.getIsMissing() && registInfo.getFrontImagePath()!=null){
            aiServerUtils.registVector(registInfo,registInfoCreateRequest.getFrontImage());
        }

        return new RegistInfoCreateResponse(registInfo);
    }
}
