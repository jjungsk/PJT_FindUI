package com.ssafy.finedUi.registInfo.aiserever;

import com.ssafy.finedUi.registInfo.aiserever.request.DeleteVectorRequest;
import com.ssafy.finedUi.registInfo.aiserever.response.RegistVectorResponse;
import com.ssafy.finedUi.common.properties.AiServerProperties;
import com.ssafy.finedUi.db.entity.RegistInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;


//aiserver와 통신 메서드 함수.

@Service
@Slf4j
public class AiServerUtils {
    @Autowired
    private AiServerProperties aiServerProperties;
    public void registVector(RegistInfo newRegistInfo, MultipartFile img) {
        log.info("registVector : ");
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("id", newRegistInfo.getRegistId());
        body.add("url", newRegistInfo.getFrontImagePath());
        body.add("img", img.getResource());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        //        jdk가 제공하는 기본 HttpURLConnection을 통해 객체생성.
        //        커넥션 풀.. 등 고급기능 다루고싶다면 ClientHttpRequestFactory 만들어서 사용.
        String url = aiServerProperties.getHost() + aiServerProperties.getCreate();
        log.info(url);
        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<RegistVectorResponse> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, RegistVectorResponse.class);
        } catch (HttpStatusCodeException e) {
            throw new RuntimeException(e);
        }
    }



    public void deleteVector(Long id) {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        log.info(id+"");
        body.add("id", id);

//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_XML);
//        HttpEntity<String,Long> requestEntity = new HttpEntity<>(body);
        //        jdk가 제공하는 기본 HttpURLConnection을 통해 객체생성.
        //        커넥션 풀.. 등 고급기능 다루고싶다면 ClientHttpRequestFactory 만들어서 사용.
        HttpEntity<DeleteVectorRequest> requestEntity = new HttpEntity<>(new DeleteVectorRequest(id));
        String url = aiServerProperties.getHost() + aiServerProperties.getDelete() + "/" + id;
        log.info(url);
        RestTemplate restTemplate = new RestTemplate();
        try {
            restTemplate.delete(url);
        } catch (HttpStatusCodeException e) {
//            없는경우. 아무동작 실행 안함.
        }
    }
    public void isMissingChangeVector(RegistInfo newRegistInfo) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("id", newRegistInfo.getRegistId());
        body.add("url", newRegistInfo.getFrontImagePath());

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        //        jdk가 제공하는 기본 HttpURLConnection을 통해 객체생성.
        //        커넥션 풀.. 등 고급기능 다루고싶다면 ClientHttpRequestFactory 만들어서 사용.
        String url = aiServerProperties.getHost() + aiServerProperties.getChange();
        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<RegistVectorResponse> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, RegistVectorResponse.class);
        } catch (HttpStatusCodeException e) {
            throw new RuntimeException(e);
        }
    }

    public void updateVector(RegistInfo newRegistInfo, MultipartFile img) {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("id", newRegistInfo.getRegistId());
        body.add("url", newRegistInfo.getFrontImagePath());
        body.add("img", img.getResource());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        //        jdk가 제공하는 기본 HttpURLConnection을 통해 객체생성.
        //        커넥션 풀.. 등 고급기능 다루고싶다면 ClientHttpRequestFactory 만들어서 사용.
        String url = aiServerProperties.getHost() + aiServerProperties.getUpdate();
        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<RegistVectorResponse> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, RegistVectorResponse.class);
        } catch (HttpStatusCodeException e) {
            throw new RuntimeException(e);
        }
    }


}
