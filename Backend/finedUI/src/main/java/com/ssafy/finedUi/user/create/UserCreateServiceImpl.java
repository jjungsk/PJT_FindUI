package com.ssafy.finedUi.user.create;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.finedUi.common.properties.SMSProperties;
import com.ssafy.finedUi.db.entity.User;
import com.ssafy.finedUi.user.UserRepository;
import com.ssafy.finedUi.user.create.request.SMSRequest;
import com.ssafy.finedUi.user.create.request.UserJoinRequest;
import com.ssafy.finedUi.user.create.response.SMSResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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
    public SMSResponse sendSMS(String recipientPhoneNumber) throws JsonProcessingException,
            UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, URISyntaxException {
        Long time = System.currentTimeMillis();
//        redis에 저장할 랜덤 6자리 인증번호 코드 만들기.
        Random generator = new Random();
        generator.setSeed(time);
        int code = generator.nextInt(1000000) % 1000000;

//        content 6자리 인증번호로 저장.
        String content = "인증번호는 " + Integer.toString(code) + "입니다";
        List<SMSMessage> messages = new ArrayList<>();
        messages.add(new SMSMessage(recipientPhoneNumber, content));

        SMSRequest smsRequest = new SMSRequest("SMS", "COMM", "82", "발신자 전화번호", "내용", messages);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = objectMapper.writeValueAsString(smsRequest);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", time.toString());
        headers.set("x-ncp-iam-access-key", smsProperties.getAccessKeyId());
        String sig = makeSignature(time); //암호화
        headers.set("x-ncp-apigw-signature-v2", sig);

        log.info(jsonBody.toString());
        HttpEntity<String> body = new HttpEntity<>(jsonBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        SMSResponse smsResponse = restTemplate.postForObject(new URI("https://sens.apigw.ntruss.com/sms/v2/services/" + smsProperties.getServiceId() + "/messages"),
                body, SMSResponse.class);

        log.info("redis 저장 :");
//        redis에저장.
        stringRedisTemplate.opsForValue().set(SMSPREFIX + recipientPhoneNumber, Integer.toString(code), smsProperties.getExpiration(), TimeUnit.MILLISECONDS);
        return smsResponse;

    }


    public String makeSignature(Long time) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {

        String space = " ";
        String newLine = "\n";
        String method = "POST";
        String url = "/sms/v2/services/" + smsProperties.getServiceId() + "/messages";
        String timestamp = time.toString();
        String accessKey = smsProperties.getAccessKeyId();
        String secretKey = smsProperties.getSecretKeyId();

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;
    }

}
