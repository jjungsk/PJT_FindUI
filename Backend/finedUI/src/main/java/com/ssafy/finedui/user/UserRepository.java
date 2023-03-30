package com.ssafy.finedui.user;

import com.ssafy.finedui.db.entity.User;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface UserRepository extends Repository<User, Long> {
    Optional<User> findById(Long id);

    Optional<User> findByName(String name);

    void deleteById(Long id);

    User save(User entity);

    User getReferenceById(Long id);

//    @Modifying
//    @Query("UPDATE User u" +
//            "SET u.")
//    int updateUser();
//    Optional<UserMypageMapping> findById(Long id);
}
