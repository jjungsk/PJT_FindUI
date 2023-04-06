package com.ssafy.finedUi.registInfo.update.service;

import com.ssafy.finedUi.db.entity.RegistInfo;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import com.ssafy.finedUi.registInfo.aiserever.AiServerUtils;
import com.ssafy.finedUi.registInfo.image.save.ImageSaveServiceImpl;
import com.ssafy.finedUi.registInfo.update.request.RegistInfoIsMissingRequest;
import com.ssafy.finedUi.registInfo.update.request.RegistInfoUpdateRequest;
import com.ssafy.finedUi.registInfo.update.response.RegistInfoUpdateResponse;
import com.ssafy.finedUi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.awt.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class RegistInfoUpdateServiceImpl implements RegistInfoUpdateService {

    private final RegistInfoRepository registInfoRepository;
    private final UserRepository userRepository;
    private final ImageSaveServiceImpl imageSaveService;

    @Autowired
    private AiServerUtils aiServerUtils;

    @Override
    public RegistInfoUpdateResponse update(RegistInfoUpdateRequest registInfoUpdateRequest) {
        registInfoUpdateRequest.setUser(userRepository.findById(registInfoUpdateRequest.getUserId()).get());
        RegistInfo registInfo = registInfoRepository.findById(registInfoUpdateRequest.getRegistId()).get();
        registInfoUpdateRequest.setCreateDate(registInfo.getCreateDate());
        Double longitude = registInfoUpdateRequest.getLongitude();
        Double latitude = registInfoUpdateRequest.getLatitude();
        MultipartFile[] multipartFiles = {registInfoUpdateRequest.getFrontImage(), registInfoUpdateRequest.getOtherImage1(), registInfoUpdateRequest.getOtherImage2()};
        String[] imagePaths = imageSaveService.save(multipartFiles, registInfoUpdateRequest.getRegistId());
        if (registInfoUpdateRequest.getFrontImagePath() == null || registInfoUpdateRequest.getFrontImagePath().isEmpty()) {
            registInfoUpdateRequest.setFrontImagePath(imagePaths[0]);
        }
        if (registInfoUpdateRequest.getOtherImage1Path() == null || registInfoUpdateRequest.getOtherImage1Path().isEmpty()) {
            registInfoUpdateRequest.setOtherImage1Path(imagePaths[1]);
        }
        if (registInfoUpdateRequest.getOtherImage2Path() == null || registInfoUpdateRequest.getOtherImage2Path().isEmpty()) {
            registInfoUpdateRequest.setOtherImage2Path(imagePaths[2]);
        }

        RegistInfo newRegistInfo = registInfoRepository.save(registInfoUpdateRequest.toEntity());
//       실종자이고, 사진을 변경하는경우 이미지 벡터 업데이트.
        if(newRegistInfo.getIsMissing() && registInfoUpdateRequest.getFrontImage()!=null){
            aiServerUtils.updateVector(newRegistInfo,registInfoUpdateRequest.getFrontImage());
        }

        return new RegistInfoUpdateResponse(newRegistInfo);
    }

    // 실종 변경
    @Override
    public RegistInfoUpdateResponse isMissingChange(RegistInfoIsMissingRequest request) {
        RegistInfoUpdateRequest registInfoUpdateRequest = new RegistInfoUpdateRequest(registInfoRepository.findById(request.getRegistId()).get());
        Boolean isMissing = registInfoUpdateRequest.getLongitude() != null && registInfoUpdateRequest.getLatitude() != null;
        // 실종 신고한 경우
        if (!isMissing) {
            registInfoUpdateRequest.setLongitude(request.getLongitude());                    // 경도 설정
            registInfoUpdateRequest.setLatitude(request.getLatitude());                      // 위도 설정
            // 실종 신고 하지 않은 경우
        } else {
            registInfoUpdateRequest.setLongitude(null);                         // 경도 설정
            registInfoUpdateRequest.setLatitude(null);                          // 위도 설정
        }

        registInfoUpdateRequest.setUser(userRepository.findById(registInfoUpdateRequest.getUserId()).get());

        RegistInfo registInfo = registInfoRepository.save(registInfoUpdateRequest.toEntity());

//        log.info(registInfo.getUpdateDate().toString() );
        //        실종신고 안햇다가 한 경우, 이미지가 있다면 관련 이미지 url에 대한 벡터추가.
        if(!isMissing ){
            if(registInfo.getFrontImagePath() != null)
                aiServerUtils.isMissingChangeVector(registInfo);
        }else{
//           실종신고 했다가 취소한경우. 이미지 벡터 있으면 제거.
            aiServerUtils.deleteVector(registInfo.getRegistId());

        }

        return new RegistInfoUpdateResponse(registInfo);
    }
}
