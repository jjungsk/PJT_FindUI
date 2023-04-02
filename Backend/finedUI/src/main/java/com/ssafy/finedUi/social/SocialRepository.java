package com.ssafy.finedUi.social;

import com.ssafy.finedUi.db.entity.Social;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface SocialRepository extends Repository<Social, Integer> {
    Optional<Social> findByProvider(String name);
}
