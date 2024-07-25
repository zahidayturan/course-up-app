package com.example.courseup.controller;

import com.example.courseup.model.User;
import com.example.courseup.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/login")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userService.findByEmail(loginRequest.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (userService.checkPassword(user, loginRequest.getPassword())) {
                return ResponseEntity.ok("Login successful");
            }
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }

    @Data
    static class LoginRequest {
        private String email;
        private String password;
    }
}
