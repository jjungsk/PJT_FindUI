package com.ssafy.finedUi.registInfo.delete.service;

import com.ssafy.finedUi.chatImage.ChatImageRepository;
import com.ssafy.finedUi.chatImage.get.response.ChatImageGetResponse;
import com.ssafy.finedUi.chatImage.s3.delete.S3DeleteService;
import com.ssafy.finedUi.registInfo.RegistInfoRepository;
import com.ssafy.finedUi.registInfo.delete.request.RegistInfoDeleteRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Transactional
@RequiredArgsConstructor
public class RegistInfoDeleteServiceImpl implements RegistInfoDeleteService{

    @Value("${image.upload.path}")
    private String filePath;    // 이미지 실제 저장 경로

    private final RegistInfoRepository registInfoRepository;
    private final ChatImageRepository chatImageRepository;
    private final S3DeleteService s3DeleteService;

    @Override
    public void delete(Long id) {
        RegistInfoDeleteRequest registInfoDeleteRequest = new RegistInfoDeleteRequest(registInfoRepository.findById(id).get());
        // 등록된 이미지 리스트
        String[] imagePathList = {registInfoDeleteRequest.getFrontImagePath(), registInfoDeleteRequest.getOtherImage1Path(), registInfoDeleteRequest.getOtherImage2Path()};
        // 이미지 모두 삭제
        for (String imagePath : imagePathList) {
            if (imagePath == null) {continue;}  // 비어있을 경우 다음 실행
            String[] splitImagePath = imagePath.split("/");
            Path path = Paths.get(filePath + "\\" + splitImagePath[splitImagePath.length-1]);   // 경로
            try {
                Files.deleteIfExists(path);     // 파일이 존재할 경우 삭제, 파일이 존재하지 않을 경우 False를 반환
            } catch (IOException e) {           // Exception이 발생하지 않음
                throw new RuntimeException(e);
            }
        }
        // S3에 저장된 실종(등록) id에 해당하는 채팅방 이미지 모두 삭제
        for (ChatImageGetResponse chatImageGetResponse : chatImageRepository.findAllByChatImageId_RegistInfo_RegistId(id)) {
            Long userId = chatImageGetResponse.getUserId();
            Long registId = chatImageGetResponse.getRegistId();
            s3DeleteService.delete(userId, registId);
        }
        chatImageRepository.deleteAllByChatImageId_RegistInfo_RegistId(id);  // 연관관계에 의해 삭제가 거부될 수 있으므로 채팅 이미지부터 삭제

        // 채팅 프로필 삭제
        registInfoRepository.delete(registInfoRepository.findById(id).get());
    }
}
