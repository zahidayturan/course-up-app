package com.example.courseup.service;

import com.example.courseup.model.CourseComments;
import com.example.courseup.model.CourseWishList;
import com.example.courseup.model.DTO.CourseCommentsDTO;
import com.example.courseup.repository.CourseCommentsRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public CourseComments update(CourseComments courseComments) {
        if (!courseCommentsRepository.existsById(courseComments.getId())) {
            throw new EntityNotFoundException("Course comment with id " + courseComments.getId() + " not found");
        }
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

    public List<CourseCommentsDTO> getCourseCommentsWithPagination(Long courseId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<CourseComments> comments = courseCommentsRepository.findByCourseId(courseId, pageable);
        return comments.stream()
                .map(CourseCommentsDTO::new)
                .collect(Collectors.toList());
    }

    public List<CourseCommentsDTO> getCourseCommentsWithUserId(Long userId) {
        List<CourseComments> comments = courseCommentsRepository.findByUserId(userId);
        return comments.stream()
                .map(CourseCommentsDTO::new)
                .collect(Collectors.toList());
    }


    public CourseComments findByTrainee(Long traineeId) {
        return courseCommentsRepository.findByTrainee(traineeId);
    }


}
