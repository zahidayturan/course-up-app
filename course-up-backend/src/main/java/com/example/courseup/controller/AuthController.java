package com.example.courseup.controller;

import com.example.courseup.model.DTO.UserDTO;
import com.example.courseup.model.User;
import com.example.courseup.repository.PasswordResetTokenRepository;
import com.example.courseup.service.EmailService;
import com.example.courseup.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        Optional<UserDTO> userDTOOptional = userService.findByEmail(loginRequest.getEmail());
        if (userDTOOptional.isPresent()) {
            UserDTO userDTO = userDTOOptional.get();
            Optional<User> userOptional = userService.findById(userDTO.getId());
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                if (userService.checkPassword(user.getPassword(), loginRequest.getPassword())) {
                    return ResponseEntity.ok("Login successful");
                }
            }
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }


    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        System.out.println("Logout successful");
        return ResponseEntity.ok("Logout successful");
    }

    @Data
    static class LoginRequest {
        private String email;
        private String password;
    }

    @Operation(summary = "Send email for password reset")
    @PostMapping("/password-reset")
    public ResponseEntity<String> requestPasswordReset(@RequestBody EmailRequest emailRequest) {
        String email = emailRequest.getEmail();
        boolean emailExists = userService.emailExists(email);
        if (!emailExists) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email not found");
        }
        String resetToken = userService.createPasswordResetToken(email);
        emailService.sendPasswordResetEmail(email, resetToken);
        return ResponseEntity.ok("Password reset email sent");
    }

    @Data
    static class EmailRequest {
        private String email;
    }

    @Operation(summary = "Reset password with token")
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        boolean success = userService.resetPassword(token, newPassword);
        if (success) {
            tokenRepository.deleteByToken(token);
            return ResponseEntity.ok("Password reset successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token or password reset failed");
        }
    }

}
