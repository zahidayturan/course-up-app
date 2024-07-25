package com.example.courseup.service;

import com.example.courseup.model.Course;
import com.example.courseup.model.CourseStages;
import com.example.courseup.repository.CourseRepository;
import com.example.courseup.repository.CourseStagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseStagesService {
    @Autowired
    private CourseStagesRepository courseStagesRepository;

    public List<CourseStages> findAll() {
        return courseStagesRepository.findAll();
    }

    public Optional<CourseStages> findById(Long id) {
        return courseStagesRepository.findById(id);
    }

    public CourseStages save(CourseStages courseStages) {
        return courseStagesRepository.save(courseStages);
    }

    public void deleteById(Long id) {
        courseStagesRepository.deleteById(id);
    }

}
