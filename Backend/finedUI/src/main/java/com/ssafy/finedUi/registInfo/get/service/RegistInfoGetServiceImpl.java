package com.ssafy.finedUi.registInfo.get.service;

import com.ssafy.finedUi.db.entity.RegistInfo;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import com.ssafy.finedUi.registInfo.get.response.RegistInfoGetResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistInfoGetServiceImpl implements RegistInfoGetService{

    private final RegistInfoRepository registInfoRepository;

    @Override
    public List<RegistInfoGetResponse> findAllByUser_UserId(Long userId) {
        return registInfoRepository.findAllByUser_UserId(userId);
    }

    @Override
    public RegistInfoGetResponse findById(Long registId) {
        return new RegistInfoGetResponse(registInfoRepository.findById(registId).get());
    }

    @Override
    public List<RegistInfoGetResponse> findAllByMissingIdAndDistance(Boolean isMissing, Double X, Double Y) {

        return null;
    }

    /*
    모든 실종 아동 조회(본인 등록 정보 포함)
     */
//    @Override
//    public List<RegistInfoGetResponse> findAllByisMissing() {
//        return registInfoRepository.findAllByIsMissing();
//    }

    /*
    모든 실종 아동 조회(본인 등록 정보 제외)
     */
    @Override
    public List<RegistInfoGetResponse> findAllByIsMissing(Long userId) {
        return registInfoRepository.findAllByIsMissing(userId);
    }
}
