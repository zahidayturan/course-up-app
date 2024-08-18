package com.example.courseup.service;

import com.example.courseup.model.DTO.UserCoursesDTO;
import com.example.courseup.model.Trainee;
import com.example.courseup.repository.CourseRepository;
import com.example.courseup.repository.TraineeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TraineeService {

    @Autowired
    private TraineeRepository traineeRepository;

    @Autowired
    private CourseRepository courseRepository;

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

    public List<UserCoursesDTO> getTraineeByUserId(Long userId) {
        List<Trainee> trainees = traineeRepository.findTraineeByUserId(userId);
        return trainees.stream()
                .map(UserCoursesDTO::new)
                .collect(Collectors.toList());
    }

    public List<UserCoursesDTO> getActiveTraineeByUserId(Long userId) {
        List<Trainee> trainees = traineeRepository.findActiveTraineeByUserId(userId);
        return trainees.stream()
                .map(UserCoursesDTO::new)
                .collect(Collectors.toList());
    }

    public boolean trainerExists(Long courseId, Long userId) {
        List<Trainee> courseTraineeLists = traineeRepository.findByCourseAndUserId(courseId, userId);
        return !courseTraineeLists.isEmpty();
    }

    public UserCoursesDTO findTraineeByCourseId(Long id) {
        Trainee trainee = traineeRepository.findById(id).orElseThrow(() -> new RuntimeException("Trainee not found ."));
        return new UserCoursesDTO(trainee);
    }

}
