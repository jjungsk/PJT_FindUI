package com.ssafy.finedui.db.repository;

import com.ssafy.finedui.db.entity.PersonalData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalDataRepository extends JpaRepository<PersonalData, Long> {
}
