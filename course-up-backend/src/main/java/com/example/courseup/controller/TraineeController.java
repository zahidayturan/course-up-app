package com.example.courseup.controller;

import com.example.courseup.model.Course;
import com.example.courseup.model.DTO.UserCoursesDTO;
import com.example.courseup.model.Trainee;
import com.example.courseup.model.User;
import com.example.courseup.service.CourseService;
import com.example.courseup.service.TraineeService;
import com.example.courseup.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/trainee")
public class TraineeController {

    @Autowired
    private TraineeService traineeService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private UserService userService;

    @Operation(summary = "Get all trainees")
    @GetMapping
    public List<Trainee> findAll() {
        return traineeService.findAll();
    }

    @Operation(summary = "Get trainee by Id")
    @GetMapping("/{id}")
    public Optional<Trainee> findById(@PathVariable Long id) {
        return traineeService.findById(id);
    }

    @Operation(summary = "Save a new trainee")
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestParam Map<String, String> params) {

        long userId;
        try {
            userId = Long.parseLong(params.get("userId"));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid userId value.");
        }
        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));
        long courseId;
        try {
            courseId = Long.parseLong(params.get("courseId"));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid courseId value .");
        }

        Course course = courseService.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found."));

        Trainee trainee = new Trainee();
        trainee.setCourse(course);
        trainee.setUser(user);
        trainee.setCoursePoint(0.0);
        trainee.setCurrentDuration(0.0);
        trainee.setCurrentStages(1);
        trainee.setIsFinished(false);

        String traineeId = traineeService.save(trainee).getId().toString();
        return ResponseEntity.ok(traineeId);
    }

    @Operation(summary = "Delete trainee by ID")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        traineeService.deleteById(id);
    }


    @Operation(summary = "Get all course by User Id")
    @GetMapping("/user/{userId}")
    public List<UserCoursesDTO> getTopPopularCourses(@PathVariable Long userId) {
        return traineeService.getTraineeByUserId(userId);
    }

    @Operation(summary = "Get all active course by User Id")
    @GetMapping("/active/user/{userId}")
    public List<UserCoursesDTO> getActiveCoursesByUserId(@PathVariable Long userId) {
        return traineeService.getActiveTraineeByUserId(userId);
    }
}
