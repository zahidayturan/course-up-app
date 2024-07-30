package com.example.courseup.controller;

import com.example.courseup.model.Trainee;
import com.example.courseup.service.TraineeService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trainee")
public class TraineeController {

    @Autowired
    private TraineeService traineeService;

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
    @PostMapping
    public Trainee save(@RequestBody Trainee trainee) {
        return traineeService.save(trainee);
    }

    @Operation(summary = "Delete trainee by ID")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        traineeService.deleteById(id);
    }


    @Operation(summary = "Get all course by User Id")
    @GetMapping("/user/{userId}")
    public List<Trainee> getCoursesByUserId(@PathVariable Long userId) {
        return traineeService.getTraineeByUserId(userId);
    }

    @Operation(summary = "Get all active course by User Id")
    @GetMapping("/active/user/{userId}")
    public List<Trainee> getActiveCoursesByUserId(@PathVariable Long userId) {
        return traineeService.getActiveTraineeByUserId(userId);
    }
}
