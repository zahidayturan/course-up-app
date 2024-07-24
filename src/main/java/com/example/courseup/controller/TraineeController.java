package com.example.courseup.controller;

import com.example.courseup.model.Trainee;
import com.example.courseup.service.TraineeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trainee")
public class TraineeController {

    @Autowired
    private TraineeService traineeService;

    @GetMapping
    public List<Trainee> findAll() {
        return traineeService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Trainee> findById(@PathVariable Long id) {
        return traineeService.findById(id);
    }

    @PostMapping
    public Trainee save(@RequestBody Trainee trainee) {
        return traineeService.save(trainee);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        traineeService.deleteById(id);
    }
}
