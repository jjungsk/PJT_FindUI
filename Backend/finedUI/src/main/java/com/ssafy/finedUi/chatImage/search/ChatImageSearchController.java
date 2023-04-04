package com.ssafy.finedUi.chatImage.search;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Api(tags = {"Search"})
@Slf4j
public class ChatImageSearchController {

    private final String AISERVER_URL = "http://localhost:9200/api/search";

    @PostMapping("/api/chat/image/search")
    @ApiOperation(value = "knnSearch 테스트용.", notes = "이미지를 딥러닝서버에 전달.")
    void knnSearch(@RequestPart MultipartFile img) {

//        resttemplate을 활용해 이미지 파일 보내기.
        log.info("test 성공 ");
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);


//        fastapi와 연결해보기.
    }

}
