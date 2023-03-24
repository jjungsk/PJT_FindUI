package com.ssafy.finedUi.registInfo;

import com.ssafy.finedUi.db.entity.RegistInfo;
import com.ssafy.finedUi.registInfo.get.response.RegistInfoGetResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistInfoRepository extends JpaRepository<RegistInfo, Long> {
    List<RegistInfoGetResponse> findAllByUser_UserId(Long userId);

}
