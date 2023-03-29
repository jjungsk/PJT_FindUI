package com.ssafy.finedUi.db;

import com.ssafy.finedUi.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
