package com.ssafy.finedUi.notice.get.service;

import com.ssafy.finedUi.db.entity.Notice;
import com.ssafy.finedUi.notice.NoticeRepository;
import com.ssafy.finedUi.notice.get.response.NoticeGetResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeGetServiceImpl implements NoticeGetService{

    private final NoticeRepository noticeRepository;

    @Override
    public List<NoticeGetResponse> getAll() {
        List<NoticeGetResponse> allNotice = new ArrayList<>();
        for (Notice notice : noticeRepository.findAll()) {
            allNotice.add(new NoticeGetResponse(notice));
        }
        return allNotice;
    }

    @Override
    public NoticeGetResponse getDetail(Long noticeId) {
        return new NoticeGetResponse(noticeRepository.findById(noticeId).get());
    }
}
