package com.example.courseup.controller;

import com.example.courseup.model.Teacher;
import com.example.courseup.service.TeacherService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

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
    @PostMapping
    public Teacher save(@RequestBody Teacher teacher) {
        return teacherService.save(teacher);
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
