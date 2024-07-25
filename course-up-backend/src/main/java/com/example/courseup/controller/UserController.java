package com.example.courseup.controller;

import com.example.courseup.model.User;
import com.example.courseup.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Operation(summary = "Get all users")
    @GetMapping
    public List<User> findAll() {
        return userService.findAll();
    }

    @Operation(summary = "Get user by Id")
    @GetMapping("/{id}")
    public Optional<User> findById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @Operation(summary = "Save a new user")
    @PostMapping
    public User save(@RequestBody User user) {
        return userService.save(user);
    }

    @Operation(summary = "Delete user by ID")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        userService.deleteById(id);
    }

    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.emailExists(user.getEmail())) {
            return ResponseEntity.status(400).body("Email is already in use");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(user);
        return ResponseEntity.ok("User registered successfully");
    }
}
