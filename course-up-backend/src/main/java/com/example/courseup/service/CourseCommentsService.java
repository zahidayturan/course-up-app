package com.example.courseup.service;

import com.example.courseup.model.CourseComments;
import com.example.courseup.model.DTO.CourseCommentsDTO;
import com.example.courseup.repository.CourseCommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
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

    public List<CourseCommentsDTO> getAllCourseComments() {
        List<CourseComments> comments = courseCommentsRepository.findAll();
        return comments.stream()
                .map(CourseCommentsDTO::new)
                .collect(Collectors.toList());
    }

}
