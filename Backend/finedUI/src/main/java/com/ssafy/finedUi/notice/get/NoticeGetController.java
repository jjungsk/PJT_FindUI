package com.ssafy.finedUi.notice.get;

import com.ssafy.finedUi.handler.ResponseHandler;
import com.ssafy.finedUi.notice.get.response.NoticeGetResponse;
import com.ssafy.finedUi.notice.get.service.NoticeGetService;
import com.ssafy.finedUi.notice.get.service.NoticeGetServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notice")
@RequiredArgsConstructor
@Slf4j
public class NoticeGetController {

    private final NoticeGetServiceImpl noticeGetService;

    @GetMapping
    public ResponseEntity<Object> getDetailNotice(@RequestParam Long noticeId) {
        return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, noticeGetService.getDetail(noticeId));
    }

    @GetMapping("/all")
    public ResponseEntity<Object> getAllNotice() {
        return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, noticeGetService.getAll());
    }
}
