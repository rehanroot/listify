package com.listify.repository;

import com.listify.model.Ad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdRepository extends JpaRepository<Ad, Long> {
    // Custom queries if needed
}
