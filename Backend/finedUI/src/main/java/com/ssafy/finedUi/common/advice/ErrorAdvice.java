package com.ssafy.finedUi.common.advice;


import com.ssafy.finedUi.common.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@RestControllerAdvice
@Slf4j
//ResponseEntityExcpetionHandler로 spring에서 자주발생하는 에러 자동 처리.
public class ErrorAdvice extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    protected ResponseEntity<?> handleAuthenticationException(AuthenticationException e) {
        log.error(e.toString());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new BaseResponse("fail", e.getMessage()));
    }

    //    runtime 예외처리. jpa 예외도 받아줌.
    @ExceptionHandler(RuntimeException.class)
    protected ResponseEntity<?> handleRuntimeException(RuntimeException e) {
        e.printStackTrace();
        log.error(e.toString());
        return ResponseEntity.status(400).body(new BaseResponse("fail", e.getMessage()));
    }

}
