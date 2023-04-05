package com.ssafy.finedUi.registInfo.get;

import com.ssafy.finedUi.common.security.SecurityUtils;
import com.ssafy.finedUi.handler.ResponseHandler;
import com.ssafy.finedUi.registInfo.get.service.RegistInfoGetService;
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

    private final RegistInfoGetService registInfoGetService;

    @GetMapping("detail")
    public ResponseEntity<Object> getDetail(@RequestParam Long registId) {
        try {
            return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, registInfoGetService.findById(registId));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(false, e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
        }
    }

    @GetMapping
    public ResponseEntity<Object> getAll(@RequestParam Long userId) {

        log.info(userId+"");
        log.info(SecurityUtils.getUserPricipal().getId() + "");

        return ResponseHandler.generateResponse(true, "OK", HttpStatus.OK, registInfoGetService.findAllByUser_UserId(
                SecurityUtils.getUserPricipal().getId()
        ));
    }

    @GetMapping("/dl")
    public void get(@RequestParam Long id) throws IOException {
        URL url = new URL("https://127.0.0.1:8000/items/" + id.toString());
        URLConnection connection = url.openConnection();
        try (BufferedReader in = new BufferedReader(
                new InputStreamReader(connection.getInputStream())))
        {
            String line;
            while ((line = in.readLine()) != null) {
                System.out.println(line);
            }
        }
    }
}
