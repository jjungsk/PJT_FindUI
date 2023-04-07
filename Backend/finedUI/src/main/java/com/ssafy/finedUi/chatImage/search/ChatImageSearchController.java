package com.ssafy.finedUi.chatImage.search;


import com.ssafy.finedUi.chatImage.search.request.ChatImageSearchRequest;
import com.ssafy.finedUi.chatImage.search.request.SearchResponse;
import com.ssafy.finedUi.common.properties.AiServerProperties;
import com.ssafy.finedUi.db.entity.RegistInfo;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@Api(tags = {"Search"})
@Slf4j
public class ChatImageSearchController {
    @Autowired
    private AiServerProperties aiServerProperties;

    @Autowired
    private RegistInfoRepository registInfoRepository;
    @PostMapping("/api/chat/image/search")
    @ApiOperation(value = "knnSearch 테스트용.", notes = "이미지를 딥러닝서버에 전달.")
    ResponseEntity<?> knnSearch(ChatImageSearchRequest chatImageSearchRequest) {

//        resttemplate을 활용해 이미지 파일 보내기.
        log.info("knnSearch 컨트롤러:            ");
//        body.add("img", generateFilenameAwareByteArrayResource(img));
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("limit", chatImageSearchRequest.getLimit());
        body.add("offset", chatImageSearchRequest.getOffset());
        body.add("img", chatImageSearchRequest.getImg().getResource());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
//        jdk가 제공하는 기본 HttpURLConnection을 통해 객체생성.
//        커넥션 풀.. 등 고급기능 다루고싶다면 ClientHttpRequestFactory 만들어서 사용.

        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<List<SearchResponse>> response = restTemplate.exchange(aiServerProperties.getHost() + aiServerProperties.getSearch(), HttpMethod.POST, requestEntity, new ParameterizedTypeReference<List<SearchResponse>>() {
            });
            //        에러처리도하기.
            log.info("Response : {}", response);
            log.info("Response : {}", response.getBody());
            List<SearchResponse> matchings = response.getBody();
//            효율성 생각 안하고 막 구현했음.
            for(int i=0; i<matchings.size();i++){

                Optional<RegistInfo> optional = registInfoRepository.findById(
                        matchings.get(i).getId()
                );
                if(optional.isPresent()){
                    matchings.get(i).setName(optional.get().getName());
                    matchings.get(i).setBirthDate(optional.get().getBirthDate());
                }
            }

            return ResponseEntity.status(200).body(matchings);
        } catch (HttpStatusCodeException e) {
            throw new RuntimeException(e);
        }

    }


    private FilenameAwareInputStreamResource generateFilenameAwareByteArrayResource(MultipartFile img) {
        try {
            return new FilenameAwareInputStreamResource(img.getInputStream(), img.getSize(), img.getOriginalFilename());
        } catch (Exception e) {
            log.error("Occur exception", e);
            throw new RuntimeException(e);
        }
    }


    //    디스크, 메모리공간 아끼기 위해 inputStream으로 데이터 읽어 바이트로 변환.
    public static class FilenameAwareInputStreamResource extends InputStreamResource {
        private final String filename;
        private final long contentLength;

        public FilenameAwareInputStreamResource(InputStream inputStream, long contentLength, String filename) {
            super(inputStream);
            this.filename = filename;
            this.contentLength = contentLength;
        }

        @Override
        public String getFilename() {
            return filename;
        }

        @Override
        public long contentLength() {
            return contentLength;
        }
    }

}
