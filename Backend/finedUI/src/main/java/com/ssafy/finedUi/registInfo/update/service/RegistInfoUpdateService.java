package com.ssafy.finedUi.registInfo.update.service;

import com.ssafy.finedUi.registInfo.create.response.RegistInfoCreateResponse;
import com.ssafy.finedUi.registInfo.update.request.RegistInfoIsMissingRequest;
import com.ssafy.finedUi.registInfo.update.request.RegistInfoUpdateRequest;
import com.ssafy.finedUi.registInfo.update.response.RegistInfoUpdateResponse;

public interface RegistInfoUpdateService {
    RegistInfoUpdateResponse update(RegistInfoUpdateRequest registInfoUpdateRequest);

    RegistInfoUpdateResponse isMissingChange(RegistInfoIsMissingRequest request);
}
