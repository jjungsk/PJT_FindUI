package com.ssafy.finedUi.api.service.personalData;

import com.ssafy.finedUi.api.dto.ChatImage.ChatImageResponseDto;
import com.ssafy.finedUi.api.dto.personalData.PersonalDataRequestDto;
import com.ssafy.finedUi.api.dto.personalData.PersonalDataResponseDto;
import com.ssafy.finedUi.api.service.PersonalImage.PersonalImageServiceImpl;
import com.ssafy.finedUi.api.service.S3Service;
import com.ssafy.finedUi.db.repository.ChatImageRepository;
import com.ssafy.finedUi.db.repository.PersonalDataRepository;
import com.ssafy.finedUi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@Transactional
@RequiredArgsConstructor
public class PersonalDataServiceImpl implements PersonalDataService{
    // 실종(사전)정보 repository
    private final PersonalDataRepository personalDataRepository;
    // 채팅 이미지 repository
    private final ChatImageRepository chatImageRepository;
    // 실종(사전) 정보 service
    private final PersonalImageServiceImpl personalImageService;
    // 사용자 repository
    private final UserRepository userRepository;
    // S3 service
    private final S3Service s3Service;

    @Override
    public void save(PersonalDataRequestDto personalDataRequestDto) {
        // user
        Long userId = personalDataRequestDto.getUserId();
        // userId로 user를 조회하여 dto에 user 할당
        personalDataRequestDto.setUser(userRepository.findById(userId).get());
        // 생성 날짜가 비어있을 경우 할당하기
        if (personalDataRequestDto.getCreateDate() == null) {
            personalDataRequestDto.setCreateDate(Timestamp.valueOf(LocalDateTime.now()));
        }
        // 이미지 파일 배열 생성
        MultipartFile[] multipartFiles = {personalDataRequestDto.getFrontImage(), personalDataRequestDto.getOtherImage1(), personalDataRequestDto.getOtherImage2()};
        // 이미지 저장 경로들 filePaths에 할당
        String[] filePaths = personalImageService.save(multipartFiles, userId);
        // 각 이미지들에 맞게 파일 경로 할당
        personalDataRequestDto.setFrontImagePath(filePaths[0]);
        personalDataRequestDto.setOtherImage1Path(filePaths[1]);
        personalDataRequestDto.setOtherImage2Path(filePaths[2]);
        // dto를 entity로 변환하여 저장
        personalDataRepository.save(personalDataRequestDto.toEntity());
    }

    @Override
    public void delete(Long id) {
        // 실종(등록) 정보 id로 조회
        PersonalDataResponseDto personalDataResponseDto = new PersonalDataResponseDto(personalDataRepository.findById(id).get());
        // 등록된 이미지 리스트
        String[] imagePathList = {personalDataResponseDto.getFrontImage(), personalDataResponseDto.getOtherImage1(), personalDataResponseDto.getOtherImage2()};
        // 이미지 모두 삭제
        for (String imagePath : imagePathList) {
            if (imagePath == null) {continue;}  // 비어있을 경우 다음 실행
            Path path = Paths.get(imagePath);   // 경로
            try {
                Files.deleteIfExists(path);     // 파일이 존재할 경우 삭제, 파일이 존재하지 않을 경우 False를 반환
            } catch (IOException e) {           // Exception이 발생하지 않음
                throw new RuntimeException(e);
            }
        }
        // S3에 저장된 실종(등록) id에 해당하는 채팅방 이미지 모두 삭제
        for (ChatImageResponseDto chatImageResponseDto : chatImageRepository.findAllByChatImageId_PersonalData_MissingId(id)) {
            Long userId = chatImageResponseDto.getUserId();
            Long missingId = chatImageResponseDto.getMissingId();
            s3Service.delete(userId, missingId);
        }
        chatImageRepository.deleteAllByChatImageId_PersonalData_MissingId(id);  // 연관관계에 의해 삭제가 거부될 수 있으므로 채팅 이미지부터 삭제
        personalDataRepository.delete(personalDataResponseDto.toEntity());      // 실종(사전) 데이터 db에서 삭제
    }

    @Override
    public PersonalDataResponseDto findById(Long id) {
        return new PersonalDataResponseDto(personalDataRepository.findById(id).get());  // findById 조회 시 personalDataRepsonse로 변환해서 반환
    }
}
