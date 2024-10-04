package com.listify.service;

import com.listify.model.User;
import com.listify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(); // Initialize password encoder
    }

    public void registerUser(String username, String password) {
        User newUser = new User();
        newUser.setUsername(username);
        // Hash the password before saving
        newUser.setPassword(passwordEncoder.encode(password));
        userRepository.save(newUser);
    }

    public boolean authenticateUser(String username, String password) {
        // Load the user by username
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return false; // User not found
        }
        // Check if the provided password matches the hashed password
        return passwordEncoder.matches(password, user.getPassword());
    }
}
