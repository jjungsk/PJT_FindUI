package com.ssafy.finedUi.kakaoLocal;

import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@Api(tags = {"카카오 위도 경도"})
@RequestMapping(value = "/api/map", produces = "text/html; charset=utf-8")
public class KaKaoController {

    private final String url = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json";
    private final String key = "KakaoAK b3f0f8e3b3eba6232aa894484881c143";

    // x, y 좌표 값으로 값 불러옴
    @GetMapping
    public String getAddress(@RequestParam Double lng, @RequestParam Double lat){
        // rest 요청 template
        RestTemplate restTemplate = new RestTemplate();

        try {
            // HttpHeaders (key, query 담는 형식)
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.set("Authorization", key);

            // url 주소
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("x", lng).queryParam("y", lat);

            // 안티티티티 프라자일 프자아리
            HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

            // addressName 형 변환
            List<Object> list = (List<Object>) restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, Map.class).getBody().get("documents");
            HashMap<String, String> hm = (HashMap<String, String>) list.get(0);
            String result = (String) hm.get("address_name");

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return "Bad Request";
        }
    }
}

/*
return 형식
{
    "meta": {
        "total_count": 2
    },
    "documents": [
        {
            "region_type": "B",
            "code": "4113510900",
            "address_name": "경기도 성남시 분당구 삼평동",
            "region_1depth_name": "경기도",
            "region_2depth_name": "성남시 분당구",
            "region_3depth_name": "삼평동",
            "region_4depth_name": "",
            "x": 127.1163593869371,
            "y": 37.40612091848614
        },
        {
            "region_type": "H",
            "code": "4113565500",
            "address_name": "경기도 성남시 분당구 삼평동",
            "region_1depth_name": "경기도",
            "region_2depth_name": "성남시 분당구",
            "region_3depth_name": "삼평동",
            "region_4depth_name": "",
            "x": 127.1163593869371,
            "y": 37.40612091848614
        }
    ]
}
   }
 */