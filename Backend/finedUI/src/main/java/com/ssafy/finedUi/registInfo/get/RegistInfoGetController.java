package com.ssafy.finedUi.registInfo.get;

import com.ssafy.finedUi.common.security.SecurityUtils;
import com.ssafy.finedUi.handler.ResponseHandler;
import com.ssafy.finedUi.registInfo.get.service.RegistInfoGetService;
import com.ssafy.finedUi.registInfo.get.service.RegistInfoGetServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

@RestController
@RequestMapping("/api/regist")
@RequiredArgsConstructor
@Slf4j
public class RegistInfoGetController {

    private final RegistInfoGetServiceImpl registInfoGetService;

    // 단일 조회
    @GetMapping("/detail")
    public ResponseEntity<Object> getDetail(@RequestParam Long registId) {
        try {
            return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, registInfoGetService.findById(registId));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    // 사용자가 등록한 모든 실종 + 사전 등록 조회 - 마이 페이지
    @GetMapping("/user")
    public ResponseEntity<Object> getAllByUser() {
        log.info("getallbyuser");
        return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, registInfoGetService.findAllByUser_UserId(
                SecurityUtils.getUserPricipal().getId()
        ));
    }

    /*
    본인이 등록한 사전 등록 or 실종 등록 조회
    isMissing : True(실종 등록), False(사전 등록)
     */
    @GetMapping("/isMissing")
    public ResponseEntity<Object> getAllRegistrationByUser(@RequestParam Long isMissing) {
        return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, registInfoGetService.findAllByUserIdAndIsMissing(
                SecurityUtils.getUserPricipal().getId(),
                isMissing));
    }

    /*
    거리 기반 필터링
     */
    @GetMapping("/distance")
    public ResponseEntity<Object> getAllMissingFilter(@RequestParam Double lnt, @RequestParam Double lat) throws Exception {
        return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, registInfoGetService.findAllByDistance(lnt, lat));
    }

    /*
    모든 실종 아동 조회(본인 등록 정보 포함) - 메인 페이지
     */
    @GetMapping()
    public ResponseEntity<Object> getAllMissing() {
        return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, registInfoGetService.findAllByIsMissing());
    }

    /*
    모든 실종 아동 조회(본인 등록 정보 제외)
     */
//    @GetMapping
//    public ResponseEntity<Object> getAll(@RequestParam Long userId) {
//        return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, registInfoGetService.findAllByIsMissing(userId));
//    }

//    @GetMapping("/dl")
//    public void get(@RequestParam Long id) throws IOException {
//        URL url = new URL("https://127.0.0.1:8000/items/" + id.toString());
//        URLConnection connection = url.openConnection();
//        try (BufferedReader in = new BufferedReader(
//                new InputStreamReader(connection.getInputStream())))
//        {
//            String line;
//            while ((line = in.readLine()) != null) {
//                System.out.println(line);
//            }
//        }
//    }

}
