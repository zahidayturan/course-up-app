package com.example.courseup.controller;

import com.example.courseup.model.Course;
import com.example.courseup.model.CourseStages;
import com.example.courseup.model.DTO.CourseStagesDTO;
import com.example.courseup.service.CourseService;
import com.example.courseup.service.CourseStagesService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/course-stages")
public class CourseStagesController {

    @Autowired
    private CourseStagesService courseStagesService;

    @Autowired
    private CourseService courseService;

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
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestParam Map<String, String> params) {
        CourseStages courseStage = new CourseStages();
        courseStage.setName(params.get("title"));
        courseStage.setDescription(params.get("description"));
        courseStage.setVideoId(params.get("videoId"));

        try {
            courseStage.setDuration(Double.valueOf(params.get("duration")));
            courseStage.setEpisode(Integer.valueOf(params.get("episode")));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid duration or episode value.");
        }

        long courseId;
        try {
            courseId = Long.parseLong(params.get("courseId"));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid courseId value.");
        }

        Course course = courseService.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found."));
        courseStage.setCourse(course);

        String courseStageId = courseStagesService.save(courseStage).getId().toString();
        return ResponseEntity.ok(courseStageId);
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
