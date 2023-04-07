package com.ssafy.finedUi.registInfo;

import com.ssafy.finedUi.db.entity.RegistInfo;
import com.ssafy.finedUi.registInfo.get.response.RegistInfoGetResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistInfoRepository extends JpaRepository<RegistInfo, Long> {
    List<RegistInfoGetResponse> findAllByUser_UserId(Long userId);

    /*
    모든 실종 아동 조회(본인이 등록한 정보 제외)
     */
//    @Query(value = "SELECT r FROM RegistInfo r WHERE r.isMissing = True AND r.user.userId != :userId")
//    List<RegistInfoGetResponse> findAllByIsMissing(Long userId);

    /*
    모든 실종 아동 조회(본인이 등록한 정보 포함
     */
    @Query(value = "SELECT r FROM RegistInfo r WHERE r.isMissing = True")
    List<RegistInfoGetResponse> findAllByIsMissing();

    // 본인이 등록한 사전 등록 or 실종 등록 조회
    @Query(value = "SELECT r FROM RegistInfo r WHERE r.user.userId = :userId And r.isMissing = :isMissing ")
    List<RegistInfoGetResponse> findAllByUserIdAndIsMissing(Long userId, Boolean isMissing);

}
