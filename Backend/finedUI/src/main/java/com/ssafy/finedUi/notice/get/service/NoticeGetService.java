package com.ssafy.finedUi.notice.get.service;

import com.ssafy.finedUi.notice.get.response.NoticeGetResponse;

import java.util.List;

public interface NoticeGetService {
    NoticeGetResponse getDetail(Long noticeId);

    List<NoticeGetResponse> getAll();
}
