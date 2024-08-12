package com.example.courseup.service;

import com.example.courseup.model.Course;
import com.example.courseup.model.DTO.AllCoursesDTO;
import com.example.courseup.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
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

    public double getCourseRating(Long courseId) {
        Double rating = courseRepository.findCourseRating(courseId);
        return rating != null ? rating : 0.0;
    }

    public Integer getNumberOfCourseStudents(Long courseId) {
        return courseRepository.findNumberOfCourseStudents(courseId);
    }

    public Integer getNumberOfCourseReviewers(Long courseId) {
        return courseRepository.findNumberOfCourseReviewers(courseId);
    }

    public List<AllCoursesDTO> getTopPopularCourses() {
        List<Course> courses = findTopCoursesByPopularity();
        return courses.stream()
                .map(course -> {
                    Integer students = getNumberOfCourseStudents(course.getId());
                    Double rating = getCourseRating(course.getId());
                    Integer reviews = getNumberOfCourseReviewers(course.getId());
                    return new AllCoursesDTO(course, students, rating, reviews);
                })
                .collect(Collectors.toList());
    }

    public List<Course> findTopCoursesByPopularity() {
        Pageable topSix = PageRequest.of(0, 6);
        List<Long> topCourseIds = courseRepository.findTopCourseIdsByPopularity(topSix);
        if (topCourseIds.isEmpty()) {
            return new ArrayList<>();
        }
        return courseRepository.findCoursesWithStagesByIds(topCourseIds);
    }

    public AllCoursesDTO getCourseDetails(Long id) {
        Course course = findById(id).orElseThrow(() -> new IllegalArgumentException("Course not found with id: " + id));
        Integer students = getNumberOfCourseStudents(course.getId());
        Double rating = getCourseRating(course.getId());
        Integer reviews = getNumberOfCourseReviewers(course.getId());
        return new AllCoursesDTO(course, students, rating, reviews);
    }

}
