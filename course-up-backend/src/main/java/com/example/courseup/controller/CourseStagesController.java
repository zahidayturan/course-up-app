package com.example.courseup.controller;

import com.example.courseup.model.CourseStages;
import com.example.courseup.model.DTO.CourseStagesDTO;
import com.example.courseup.service.CourseStagesService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/course-stages")
public class CourseStagesController {

    @Autowired
    private CourseStagesService courseStagesService;

    @Operation(summary = "Get all course stages")
    @GetMapping
    public List<CourseStagesDTO> findAll() {
        return courseStagesService.getAllCourseStages();
    }

    @Operation(summary = "Get course stage by Id")
    @GetMapping("/{id}")
    public Optional<CourseStages> findById(@PathVariable Long id) {
        return courseStagesService.findById(id);
    }

    @Operation(summary = "Save a new course stage")
    @PostMapping
    public CourseStages save(@RequestBody CourseStages courseStages) {
        return courseStagesService.save(courseStages);
    }

    @Operation(summary = "Delete course stage by ID")
    public void deleteById(@PathVariable Long id) {
        courseStagesService.deleteById(id);
    }

    @GetMapping("/all-stages")
    public List<CourseStagesDTO> getAllCourseStages() {
        //return courseStagesService.getAllCourseStages();
        return null;
    }
    @Operation(summary = "Get all course stage by CourseId")
    @GetMapping("/all/{id}")
    public List<CourseStagesDTO> getAllCourseStagesByCourseId(@PathVariable Long id) {
        return courseStagesService.getAllCourseStagesByCourseId(id);
    }

}
