package com.ssafy.finedUi.user.create;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.finedUi.common.properties.SMSProperties;
import com.ssafy.finedUi.db.entity.User;
import com.ssafy.finedUi.user.UserRepository;
import com.ssafy.finedUi.user.create.request.PhoneConfirmRequest;
import com.ssafy.finedUi.user.create.request.SMSRequest;
import com.ssafy.finedUi.user.create.request.UserJoinRequest;
import com.ssafy.finedUi.user.create.response.SMSResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class UserCreateServiceImpl implements UserCreateService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    SMSProperties smsProperties;
    @Autowired
    StringRedisTemplate stringRedisTemplate;

    private final String SMSPREFIX = "SMS ";
    private final String VERIFICATION_PRFIX = "VERIFY ";


    @Override
    public boolean checkValid(UserJoinRequest joinRequest) {
        //유효성 검사. 추후 구현
        return true;
    }

    @Override
    public boolean createUser(UserJoinRequest joinRequest) {

        //입력정보 유효성 검사.
        if (!checkValid(joinRequest)) return false;

        User user = new User();
        user.setEmail(joinRequest.getEmail());
        user.setAddress(joinRequest.getAddress());
        user.setName(joinRequest.getName());
        user.setPhoneNumber(joinRequest.getPhoneNumber());
//               비밀번호 암호화
        user.setPassword(passwordEncoder.encode(joinRequest.getPassword()));
//       UX 측면에서 사용자에게 중복된 아이디라는걸 알려주기 위해 유일성 에러체크는 나중에 구현.

//       제약조건 위반 에러 처리는 controllerAdvice
        User temp = userRepository.save(user);
        if (temp == null) return false;
        return true;

    }

    @Override
//    @Transactional
    public String sendSMS(String recipientPhoneNumber) throws JsonProcessingException,
            UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, URISyntaxException {
        String path = "/sms/v2/services/" + smsProperties.getServiceId() + "/messages";
        URI uri = new URI("https://sens.apigw.ntruss.com" + path);
        String code = makeAuthNumber(recipientPhoneNumber);
        String message = "[finedyou] 인증번호는 " + code + "입니다.";

//        Request 요청 값 생성
        SMSRequest smsRequest = new SMSRequest();
        smsRequest.setType("SMS");
        smsRequest.setContentType("COMM");
        smsRequest.setCountryCode("82");
        smsRequest.setFrom(recipientPhoneNumber);
        smsRequest.setContent(message);
        List<SMSMessage> messages = new ArrayList<>();
        messages.add(new SMSMessage(recipientPhoneNumber));
        smsRequest.setMessages(messages);

        // 생성한 Request를 json형식으로 변경
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = objectMapper.writeValueAsString(smsRequest);

        //header생성
        HttpHeaders header = makeHeader("POST", path);
        // header와 request를 넣어 요청 body 생성
        HttpEntity<String> body = new HttpEntity<>(jsonBody, header);

        // Api 요청 보내기
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        ResponseEntity<SMSResponse> response = restTemplate.postForEntity(uri, body, SMSResponse.class);

        // 요청에 대한 응답 반환.
        String result = response.getBody().getStatusName();

        return result;
    }

    @Override
    public boolean verifyCode(PhoneConfirmRequest phoneConfirmRequest) {
        String phoneNumber = phoneConfirmRequest.getPhoneNumber();

        String code = stringRedisTemplate.opsForValue().get(SMSPREFIX + phoneNumber);
        if (code.equals(phoneConfirmRequest.getCode())) {
            return true;
        }
        return false;
    }

    private String makeAuthNumber(String userPhone) {

        // 6자리 인증번호 생성
        Random random = new Random();

        // 6자리로 형식 맞추기
        DecimalFormat df = new DecimalFormat("000000");
        String authNumber = String.valueOf(df.format(random.nextInt(1000000)));

        // Redis에 인증번호 저장, 4분이 지나면 없어진다.
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        valueOperations.set(SMSPREFIX + userPhone, authNumber, 4, TimeUnit.MINUTES);

        return authNumber;
    }

    public HttpHeaders makeHeader(String method, String url) throws InvalidKeyException, IllegalStateException, UnsupportedEncodingException, NoSuchAlgorithmException {

        // 새로운 헤더 객체 생성
        HttpHeaders headers = new HttpHeaders();

        // 현재 밀리초, API Gateway 서버와 시간 차가 5분 이상 나는 경우 유효하지 않은 요청으로 간주
        String timestamp = String.valueOf(System.currentTimeMillis());
        headers.set("x-ncp-apigw-timestamp", timestamp);

        // 네이버 클라우드 플랫폼 포털이나 Sub Account에서 발급받은 Access Key ID
        headers.set("x-ncp-iam-access-key", smsProperties.getAccessKeyId());

        // Body를 Access Key ID와 맵핑되는 Secret Key로 암호화한 서명값
        headers.set("x-ncp-apigw-signature-v2", makeSignature(method, url, timestamp));

        // 형식을 JSON으로 지정
        headers.setContentType(MediaType.APPLICATION_JSON);

        return headers;

    }

    private String makeSignature(String method, String url, String timestamp) throws IllegalStateException, UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {

        // 네이버 클라우드의 signatureKey 암호화 코드
        String message = new StringBuilder().append(method).append(" ").append(url)
                .append("\n").append(timestamp).append("\n")
                .append(smsProperties.getAccessKeyId()).toString();

        // StringToSign을 생성하고 SecretKey로 HmacSHA256 알고리즘으로 암호화
        SecretKeySpec signingKey = new SecretKeySpec(smsProperties.getSecretKeyId().getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);
        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));

        // Base64로 인코딩
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;

    }


}
