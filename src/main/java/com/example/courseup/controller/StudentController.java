package com.example.courseup.controller;

import com.example.courseup.model.Student;
import com.example.courseup.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Student> findById(@PathVariable Long id) {
        return studentRepository.findById(id);
    }

    @PostMapping
    public Student save(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        studentRepository.deleteById(id);
    }

}
