package com.example.courseup.controller;

import com.example.courseup.model.CourseComments;
import com.example.courseup.service.CourseCommentsService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/course-comment")
public class CourseCommentController {

    @Autowired
    private CourseCommentsService courseCommentsService;

    @Operation(summary = "Get all course comments")
    @GetMapping
    public List<CourseComments> findAll() {
        return courseCommentsService.findAll();
    }

    @Operation(summary = "Get course comment by Id")
    @GetMapping("/{id}")
    public Optional<CourseComments> findById(@PathVariable Long id) {
        return courseCommentsService.findById(id);
    }

    @Operation(summary = "Save a new course comment")
    @PostMapping
    public CourseComments save(@RequestBody CourseComments courseComments) {
        return courseCommentsService.save(courseComments);
    }

    @Operation(summary = "Delete course comments by ID")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        courseCommentsService.deleteById(id);
    }

}