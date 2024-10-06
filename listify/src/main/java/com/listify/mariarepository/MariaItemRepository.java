package com.listify.mariarepository;

import com.listify.mariamodel.MariaItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MariaItemRepository extends JpaRepository<MariaItem, Long> {
    // Custom queries for MariaDB entities can go here
}
