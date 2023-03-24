package com.ssafy.finedUi.registInfo.delete.service;

import com.ssafy.finedUi.db.entity.RegistInfo;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistInfoDeleteServiceImpl implements RegistInfoDeleteService{

    private final RegistInfoRepository registInfoRepository;

    @Override
    public void delete(Long id) {
        // 채팅 프로필 삭제
        registInfoRepository.delete(registInfoRepository.findById(id).get());
    }
}
