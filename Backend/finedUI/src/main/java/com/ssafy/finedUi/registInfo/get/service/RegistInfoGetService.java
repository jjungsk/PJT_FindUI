package com.ssafy.finedUi.registInfo.get.service;

import com.ssafy.finedUi.registInfo.get.response.RegistInfoGetResponse;

import java.util.List;

public interface RegistInfoGetService {
    List<RegistInfoGetResponse> findAllByUser_UserId(Long userId);

    RegistInfoGetResponse findById(Long registId);

    List<RegistInfoGetResponse> findAllByMissingIdAndDistance(Boolean isMissing, Double X, Double Y);

    /*
    모든 실종 아동 조회(본인 등록 정보 포함)
     */
    List<RegistInfoGetResponse> findAllByIsMissing();

    /*
    모든 실종 아동 조회(본인 등록 정보 제외)
     */
//    List<RegistInfoGetResponse> findAllByIsMissing(Long userId);
}
