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
        newUser.setPassword(passwordEncoder.encode(password)); // Encrypt password before saving
        userRepository.save(newUser);
    }

    public boolean authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username); // Retrieve user by username
        return user != null && passwordEncoder.matches(password, user.getPassword()); // Check password
    }
}
