package com.example.courseup.controller;

import com.example.courseup.model.Teacher;
import com.example.courseup.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @GetMapping
    public List<Teacher> findAll() {
        return teacherService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Teacher> findById(@PathVariable Long id) {
        return teacherService.findById(id);
    }

    @PostMapping
    public Teacher save(@RequestBody Teacher teacher) {
        return teacherService.save(teacher);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        teacherService.deleteById(id);
    }
}
