package com.example.courseup.controller;

import com.example.courseup.model.Teacher;
import com.example.courseup.model.User;
import com.example.courseup.service.TeacherService;
import com.example.courseup.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private UserService userService;

    @Operation(summary = "Get all teachers")
    @GetMapping
    public List<Teacher> findAll() {
        return teacherService.findAll();
    }

    @Operation(summary = "Get teacher by Id")
    @GetMapping("/{id}")
    public Optional<Teacher> findById(@PathVariable Long id) {
        return teacherService.findById(id);
    }

    @Operation(summary = "Save a new teacher")
    @PostMapping(consumes = "application/json", produces = "application/json")
    public Teacher save(@RequestBody TeacherRequest teacherRequest) {
        Optional<User> optionalUser = userService.findById(teacherRequest.getUserId());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Teacher teacher = new Teacher();
            teacher.setUser(user);
            teacher.setDescription(teacherRequest.getDescription());
            return teacherService.save(teacher);
        } else {
            throw new RuntimeException("User not found with id: " + teacherRequest.getUserId());
        }
    }

    @Data
    public static class TeacherRequest {
        private Long userId;
        private String description;
    }

    @Operation(summary = "Delete teacher by ID")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        teacherService.deleteById(id);
    }

    @Operation(summary = "Check is teacher by userId")
    @GetMapping("/is-teacher/{userId}")
    public boolean checkIsTeacher(@PathVariable Long userId) {
        return teacherService.checkIsTeacher(userId);
    }
}
