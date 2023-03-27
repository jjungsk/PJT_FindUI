package com.ssafy.finedui.social;

import com.ssafy.finedui.db.entity.Social;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface SocialRepository extends Repository<Social, Integer> {
    Optional<Social> findByProvider(String name);
}
