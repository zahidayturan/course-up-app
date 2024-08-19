package com.example.courseup.controller;

import com.example.courseup.model.Course;
import com.example.courseup.model.DTO.UserCoursesDTO;
import com.example.courseup.model.Trainee;
import com.example.courseup.model.User;
import com.example.courseup.service.CourseService;
import com.example.courseup.service.TraineeService;
import com.example.courseup.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
        trainee.setCurrentStage(1);
        trainee.setIsFinished(false);

        String traineeId = traineeService.save(trainee).getId().toString();
        return ResponseEntity.ok(traineeId);
    }

    @Operation(summary = "Update a trainee")
    @PostMapping("/update")
    public ResponseEntity<String> updateTrainee(@RequestParam Map<String, String> params) {

        Long traineeId = courseService.parseLong(params.get("traineeId"));
        if (traineeId == null) {
            return ResponseEntity.badRequest().body("Invalid traineeId value.");
        }

        Trainee oldTrainee = traineeService.findById(traineeId)
                .orElseThrow(() -> new EntityNotFoundException("Trainee with id " + traineeId + " not found"));

        Trainee trainee = new Trainee();
        trainee.setId(traineeId);

        long userId = courseService.parseLong(params.get("userId"));
        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found ."));
        trainee.setUser(user);

        trainee.setCourseComments(oldTrainee.getCourseComments());


        long courseId = courseService.parseLong(params.get("courseId"));
        Course course = courseService.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found."));
        trainee.setCourse(course);

        trainee.setCurrentDuration(courseService.parseDouble(params.get("currentDuration"), oldTrainee.getCurrentDuration()));
        trainee.setCurrentStage(courseService.parseInteger(params.get("currentStage"),oldTrainee.getCurrentStage()));
        trainee.setCoursePoint(courseService.parseDouble(params.get("coursePoint"), oldTrainee.getCoursePoint()));

        trainee.setStartedDate(traineeService.parseLocalDate(params.get("startedDate"), oldTrainee.getStartedDate()));
        trainee.setEndDate(traineeService.parseLocalDate(params.get("endDate"), oldTrainee.getEndDate()));
        trainee.setIsFinished(courseService.parseBoolean(params.get("isFinished"), oldTrainee.getIsFinished()));

        Trainee updatedTrainee = traineeService.update(trainee);
        return ResponseEntity.ok(updatedTrainee.getId().toString());
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

    @Operation(summary = "Check course in trainer")
    @GetMapping("/check/{courseId}/{userId}")
    public ResponseEntity<String> checkCourseInTrainer(@PathVariable Long courseId, @PathVariable Long userId) {
        if (traineeService.trainerExists(courseId, userId)) {
            return ResponseEntity.ok("true");
        }else {
            return ResponseEntity.ok("false");
        }
    }

    @Operation(summary = "Get trainee by courseId")
    @GetMapping("/get/{id}")
    public UserCoursesDTO getTraineeById(@PathVariable Long id) {
        return traineeService.findTraineeByCourseId(id);
    }

    @Operation(summary = "Update trainee's current duration")
    @PostMapping("/updateCurrentDuration")
    public ResponseEntity<String> updateTraineeCurrentDuration(@RequestParam Long traineeId, @RequestParam Double currentDuration) {
        Trainee trainee = traineeService.findById(traineeId)
                .orElseThrow(() -> new EntityNotFoundException("Trainee with id " + traineeId + " not found"));

        trainee.setCurrentDuration(currentDuration);
        traineeService.update(trainee);

        return ResponseEntity.ok("Current duration updated successfully.");
    }

    @Operation(summary = "Update trainee's current stage")
    @PostMapping("/updateCurrentStage")
    public ResponseEntity<String> updateTraineeCurrentStage(@RequestParam Long traineeId, @RequestParam Integer currentStage) {
        Trainee trainee = traineeService.findById(traineeId)
                .orElseThrow(() -> new EntityNotFoundException("Trainee with id " + traineeId + " not found"));

        trainee.setCurrentStage(currentStage);
        traineeService.update(trainee);

        return ResponseEntity.ok("Current stage updated successfully.");
    }

    @Operation(summary = "Update trainee's course point")
    @PostMapping("/updateCoursePoint")
    public ResponseEntity<String> updateTraineeCoursePoint(@RequestParam Long traineeId, @RequestParam Double coursePoint) {
        Trainee trainee = traineeService.findById(traineeId)
                .orElseThrow(() -> new EntityNotFoundException("Trainee with id " + traineeId + " not found"));

        trainee.setCoursePoint(coursePoint);
        traineeService.update(trainee);

        return ResponseEntity.ok("Course point updated successfully.");
    }

    @Operation(summary = "Update trainee's end date")
    @PostMapping("/updateEndDate")
    public ResponseEntity<String> updateTraineeEndDate(@RequestParam Long traineeId, @RequestParam String endDate) {
        Trainee trainee = traineeService.findById(traineeId)
                .orElseThrow(() -> new EntityNotFoundException("Trainee with id " + traineeId + " not found"));

        LocalDate date = traineeService.parseLocalDate(endDate, trainee.getEndDate());
        trainee.setEndDate(date);
        traineeService.update(trainee);

        return ResponseEntity.ok("End date updated successfully.");
    }

    @Operation(summary = "Update trainee's completion status")
    @PostMapping("/updateIsFinished")
    public ResponseEntity<String> updateTraineeIsFinished(@RequestParam Long traineeId, @RequestParam Boolean isFinished) {
        Trainee trainee = traineeService.findById(traineeId)
                .orElseThrow(() -> new EntityNotFoundException("Trainee with id " + traineeId + " not found"));

        trainee.setIsFinished(isFinished);
        traineeService.update(trainee);

        return ResponseEntity.ok("Completion status updated successfully.");
    }
}
