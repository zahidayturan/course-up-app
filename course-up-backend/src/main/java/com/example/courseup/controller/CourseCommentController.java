package com.example.courseup.controller;

import com.example.courseup.model.CourseComments;
import com.example.courseup.model.DTO.CourseCommentsDTO;
import com.example.courseup.service.CourseCommentsService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/course-comments")
public class CourseCommentController {

    @Autowired
    private CourseCommentsService courseCommentsService;

    @Operation(summary = "Get all course comments")
    @GetMapping
    public List<CourseCommentsDTO> findAll() {
        return courseCommentsService.getAllCourseComments();
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

    @Operation(summary = "All course comments")
    @GetMapping("/all-comments")
    public List<CourseCommentsDTO> getAllCourseComments() {
        /*return courseCommentsService.getAllCourseComments();*/
        return null;
    }

    @Operation(summary = "Course comments by courseId with pagination")
    @GetMapping("/all/{id}")
    public List<CourseCommentsDTO> getAllCourseCommentsByCourseId(
            @PathVariable Long id,
            @RequestParam int page,
            @RequestParam int size) {
        return courseCommentsService.getCourseCommentsWithPagination(id, page, size);
    }

    @Operation(summary = "Course comments by userId")
    @GetMapping("/user/{userId}")
    public List<CourseCommentsDTO> getAllCourseCommentsByUserId(@PathVariable Long userId) {
        return courseCommentsService.getCourseCommentsWithUserId(userId);
    }

}
