package com.ssafy.finedUi.registInfo.update.service;

import com.ssafy.finedUi.registInfo.update.request.RegistInfoUpdateRequest;
import com.ssafy.finedUi.registInfo.update.response.RegistInfoUpdateResponse;

public interface RegistInfoUpdateService {
    RegistInfoUpdateResponse update(RegistInfoUpdateRequest registInfoUpdateRequest);
}
