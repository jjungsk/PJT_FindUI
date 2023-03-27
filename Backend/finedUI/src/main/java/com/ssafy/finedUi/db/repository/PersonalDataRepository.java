package com.ssafy.finedUi.db.repository;

import com.ssafy.finedUi.db.entity.PersonalData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalDataRepository extends JpaRepository<PersonalData, Long> {
}
