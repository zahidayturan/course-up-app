package com.example.courseup.controller;

import com.example.courseup.model.Student;
import com.example.courseup.repository.StudentRepository;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Operation(summary = "Get all students")
    @GetMapping
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Operation(summary = "Get student by Id")
    @GetMapping("/{id}")
    public Optional<Student> findById(@PathVariable Long id) {
        return studentRepository.findById(id);
    }

    @Operation(summary = "Save a new student")
    @PostMapping
    public Student save(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @Operation(summary = "Delete student by ID")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        studentRepository.deleteById(id);
    }

}
