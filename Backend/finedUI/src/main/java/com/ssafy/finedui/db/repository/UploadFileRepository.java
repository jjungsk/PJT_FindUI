package com.ssafy.finedui.db.repository;

import com.ssafy.finedui.db.entity.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UploadFileRepository extends JpaRepository<UploadFile, Long> {
}
