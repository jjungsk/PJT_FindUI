package com.ssafy.repositary;

import com.ssafy.db.entity.User;
import org.springframework.data.repository.Repository;

import java.util.Optional;

@org.springframework.stereotype.Repository
public interface UserRepositary extends Repository<User,Integer> {
    Optional<User> findById(Integer Id);
    void delete(User entity);

    void save(User entity);
}
