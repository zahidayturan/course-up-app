package com.example.courseup.controller;

import com.example.courseup.model.CourseStages;
import com.example.courseup.repository.CourseStagesRepository;
import com.example.courseup.service.CourseStagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/course-stages")
public class CourseStagesController {

    @Autowired
    private CourseStagesService courseStagesService;

    @GetMapping
    public List<CourseStages> findAll() {
        return courseStagesService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<CourseStages> findById(@PathVariable Long id) {
        return courseStagesService.findById(id);
    }

    @PostMapping
    public CourseStages save(@RequestBody CourseStages courseStages) {
        return courseStagesService.save(courseStages);
    }

    public void deleteById(@PathVariable Long id) {
        courseStagesService.deleteById(id);
    }

}
