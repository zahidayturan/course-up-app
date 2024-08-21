package com.example.courseup.service;

import com.example.courseup.model.DTO.UserDTO;
import com.example.courseup.model.PasswordResetToken;
import com.example.courseup.model.User;
import com.example.courseup.repository.PasswordResetTokenRepository;
import com.example.courseup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<UserDTO> getAllUserInfo(Long id) {
        return userRepository.findById(id)
                .map(UserDTO::new);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<UserDTO> findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(UserDTO::new);
    }

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public String createPasswordResetToken(String email) {
        UserDTO userDTO = findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found by email"));
        User user = findById(userDTO.getId())
                .orElseThrow(() -> new RuntimeException("User not found by id"));
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(token, user);
        tokenRepository.save(resetToken);
        return token;
    }

    public boolean resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token);
        if (resetToken == null || resetToken.isExpired()) {
            return false;
        }
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        tokenRepository.delete(resetToken);
        return true;
    }

    public boolean checkPassword(String userPassword, String rawPassword) {
        return passwordEncoder.matches(rawPassword, userPassword);
    }
}
