package com.example.courseup.controller;

import com.example.courseup.model.DTO.UserDTO;
import com.example.courseup.model.User;
import com.example.courseup.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<UserDTO> findById(@PathVariable Long id) {
        Optional<UserDTO> user = userService.getAllUserInfo(id);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
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

    @Operation(summary = "Register User with email check")
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest newUser) {
        if (userService.emailExists(newUser.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already in use");
        }
        System.out.println(newUser.getName());
        System.out.println(newUser.getSurname());
        System.out.println(newUser.getEmail());
        System.out.println(newUser.getPassword());
        if (newUser.getPassword() == null || newUser.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password must not be empty");
        }

        User user = new User();
        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        user.setName(newUser.getName());
        user.setSurname(newUser.getSurname());
        user.setEmail(newUser.getEmail());
        userService.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @Data
    static class RegisterRequest {
        private String name;
        private String surname;
        private String email;
        private String password;
    }

    @Operation(summary = "Get User Info by email")
    @GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        Optional<UserDTO> user = userService.findByEmail(email);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Operation(summary = "Check email existence")
    @GetMapping("/email-check/{email}")
    public ResponseEntity<String> checkUserEmail(@PathVariable String email) {
        if (userService.emailExists(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already in use");
        }
        return ResponseEntity.ok("Email is available");
    }
}
