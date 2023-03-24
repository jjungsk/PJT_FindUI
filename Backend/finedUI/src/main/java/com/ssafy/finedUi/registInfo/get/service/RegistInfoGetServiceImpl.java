package com.ssafy.finedUi.registInfo.get.service;

import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import com.ssafy.finedUi.registInfo.get.response.RegistInfoGetResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
