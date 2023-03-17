package com.ssafy.user;

import com.ssafy.db.entity.User;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface UserRepository extends Repository<User, Integer> {
    Optional<User> findById(Integer Id);

    void delete(User entity);

    void save(User entity);
}
