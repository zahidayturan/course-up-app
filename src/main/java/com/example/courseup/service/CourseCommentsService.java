package com.example.courseup.service;

import com.example.courseup.model.CourseComments;
import com.example.courseup.repository.CourseCommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class CourseCommentsService {

    @Autowired
    private CourseCommentsRepository courseCommentsRepository;

    public List<CourseComments> findAll() {
        return courseCommentsRepository.findAll();
    }

    public Optional<CourseComments> findById(Long id) {
        return courseCommentsRepository.findById(id);
    }

    public CourseComments save(CourseComments courseComments) {
        return courseCommentsRepository.save(courseComments);
    }

    public void deleteById(Long id) {
        courseCommentsRepository.deleteById(id);
    }

}
