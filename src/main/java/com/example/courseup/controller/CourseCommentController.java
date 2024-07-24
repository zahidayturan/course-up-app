package com.example.courseup.controller;

import com.example.courseup.model.CourseComments;
import com.example.courseup.service.CourseCommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/course-comment")
public class CourseCommentController {

    @Autowired
    private CourseCommentsService courseCommentsService;

    @GetMapping
    public List<CourseComments> findAll() {
        return courseCommentsService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<CourseComments> findById(@PathVariable Long id) {
        return courseCommentsService.findById(id);
    }

    @PostMapping
    public CourseComments save(@RequestBody CourseComments courseComments) {
        return courseCommentsService.save(courseComments);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        courseCommentsService.deleteById(id);
    }


}
