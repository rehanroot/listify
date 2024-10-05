package com.listify.repository;

import com.listify.model.User; // Ensure this import is correct
import org.springframework.data.jpa.repository.JpaRepository;

// Extend JpaRepository and add custom query methods
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username); // Method to find a user by username
}
