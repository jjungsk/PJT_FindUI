package com.ssafy.finedUi.registInfo.create.service;

import com.ssafy.finedUi.registInfo.create.request.RegistInfoCreateRequest;
import com.ssafy.finedUi.registInfo.create.response.RegistInfoCreateResponse;
import org.springframework.web.multipart.MultipartFile;

public interface RegistInfoCreateService {
    RegistInfoCreateResponse save(RegistInfoCreateRequest registInfoCreateRequest);
}
