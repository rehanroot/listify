package com.listify.service;

import com.listify.model.User;
import com.listify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(String username, String password) {
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password);
        userRepository.save(newUser);
    }

    public boolean authenticateUser(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username, password);
        return user != null; // Return true if user exists
    }
}
