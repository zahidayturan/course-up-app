package com.example.courseup.controller;

import com.example.courseup.model.Course;
import com.example.courseup.service.CourseService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Operation(summary = "Get all course")
    @GetMapping
    public List<Course> findAll() {
        return courseService.findAll();
    }

    @Operation(summary = "Get course by Id")
    @GetMapping("/{id}")
    public Optional<Course> findById(@PathVariable Long id) {
        return courseService.findById(id);
    }

    @Operation(summary = "Save a new course")
    @PostMapping
    public Course save(@RequestBody Course course) {
        return courseService.save(course);
    }

    @Operation(summary = "Delete course by ID")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        courseService.deleteById(id);
    }

    @Operation(summary = "Get all course by User Id")
    @GetMapping("/user/{userId}")
    public List<Course> getCoursesByUserId(@PathVariable Long userId) {
        return courseService.getCoursesByUserId(userId);
    }

    @Operation(summary = "Get all course by Category Name")
    @GetMapping("/category/{categoryName}")
    public List<Course> getCoursesByCategory(@PathVariable String categoryName) {
        return courseService.getCoursesByCategory(categoryName);
    }
}
