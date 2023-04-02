package com.ssafy.finedUi.registInfo.get.service;

import com.ssafy.finedUi.registInfo.get.response.RegistInfoGetResponse;

import java.util.List;

public interface RegistInfoGetService {
    List<RegistInfoGetResponse> findAllByUser_UserId(Long userId);

    RegistInfoGetResponse findById(Long registId);

    List<RegistInfoGetResponse> findAllByMissingIdAndDistance(Boolean isMissing, Double X, Double Y);
}
