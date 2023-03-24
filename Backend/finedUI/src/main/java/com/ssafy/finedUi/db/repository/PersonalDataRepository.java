package com.ssafy.finedUi.db.repository;

import com.ssafy.finedUi.api.dto.personalData.PersonalDataResponseDto;
import com.ssafy.finedUi.db.entity.PersonalData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonalDataRepository extends JpaRepository<PersonalData, Long> {
    List<PersonalDataResponseDto> findAllByUser_UserId(Long userId);

}
