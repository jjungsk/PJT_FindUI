package com.ssafy.finedui.db.repository;

import com.ssafy.finedui.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
