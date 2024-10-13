package com.listify.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
public class HelloController {

    @GetMapping("/api/hello")
    public ResponseEntity<String> sayHello() {
        String jsonResponse = "{\"message\": \"Hello from Spring Boot!\"}";  // Create a JSON string
        return new ResponseEntity<>(jsonResponse, HttpStatus.OK);  // Return as a ResponseEntity
    }
}
