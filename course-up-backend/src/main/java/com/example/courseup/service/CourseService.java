package com.example.courseup.service;

import com.example.courseup.model.Course;
import com.example.courseup.model.CourseComments;
import com.example.courseup.model.DTO.CourseCommentsDTO;
import com.example.courseup.model.DTO.PopularCoursesDTO;
import com.example.courseup.model.User;
import com.example.courseup.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    public Optional<Course> findById(Long id) {
        return courseRepository.findById(id);
    }

    public Course save(Course course) {
        return courseRepository.save(course);
    }

    public void deleteById(Long id) {
        courseRepository.deleteById(id);
    }

    public List<Course> getCoursesByUserId(Long userId) {
        return courseRepository.findCoursesByUserId(userId);
    }

    public List<Course> getCoursesByCategory(String categoryName) {
        return courseRepository.findCoursesByCategory(categoryName);
    }


    public List<PopularCoursesDTO> getTopPopularCourses() {
        List<Course> course = courseRepository.findTopCoursesByPopularity();
        return course.stream()
                .map(PopularCoursesDTO::new)
                .collect(Collectors.toList());
    }
}
