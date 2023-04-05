package com.ssafy.finedUi.notice.get.response;

import com.ssafy.finedUi.db.entity.Notice;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NoticeGetResponse {
    private Long noticeId;
    private String title;
    private String content;

    public NoticeGetResponse(Notice notice) {
        this.noticeId = notice.getNoticeId();
        this.title = notice.getTitle();
        this.content = notice.getContent();
    }
}
