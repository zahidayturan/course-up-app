package com.example.courseup.service;

import com.example.courseup.model.Trainee;
import com.example.courseup.repository.TraineeRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class TraineeService {

    @Autowired
    private TraineeRepository traineeRepository;

    public List<Trainee> findAll() {
        return traineeRepository.findAll();
    }

    public Optional<Trainee> findById(Long id) {
        return traineeRepository.findById(id);
    }

    public Trainee save(Trainee trainee) {
        return traineeRepository.save(trainee);
    }

    public void deleteById(Long id) {
        traineeRepository.deleteById(id);
    }

}
