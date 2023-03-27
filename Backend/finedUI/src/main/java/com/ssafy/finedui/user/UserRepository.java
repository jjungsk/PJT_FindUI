package com.ssafy.finedui.user;

import com.ssafy.finedui.db.entity.User;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface UserRepository extends Repository<User, Long> {
    Optional<User> findById(Long Id);

    Optional<User> findByName(String name);

    void delete(User entity);

    User save(User entity);
}
