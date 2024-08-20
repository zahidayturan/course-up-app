package com.example.courseup.service;

import com.example.courseup.model.Course;
import com.example.courseup.model.CourseStages;
import com.example.courseup.model.DTO.AllCoursesDTO;
import com.example.courseup.repository.CourseRepository;
import com.example.courseup.repository.CourseStagesRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseStagesRepository courseStagesRepository;

    @Autowired
    private S3Service s3Service;

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
        Course course = findById(id).orElseThrow(() -> new EntityNotFoundException("Course with id " + id + " not found"));
        if (course.getImageId() != null) {
            s3Service.deleteFile(course.getImageId());
        }
        List<CourseStages> courseStages = courseStagesRepository.findByCourseId(id);
        courseStages.forEach(stage -> {
            if (stage.getVideoId() != null) {
                s3Service.deleteFile(stage.getVideoId());
            }
        });
        courseStagesRepository.deleteByCourseId(id);
        courseRepository.deleteById(id);
    }


    public Course update(Course course) {
        if (!courseRepository.existsById(course.getId())) {
            throw new EntityNotFoundException("Course with id " + course.getId() + " not found");
        }
        return courseRepository.save(course);
    }

    public List<Course> getCoursesByUserId(Long userId) {
        return courseRepository.findCoursesByUserId(userId);
    }

    public List<AllCoursesDTO> getCoursesByCategory(String categoryName) {
        List<Course> courses = courseRepository.findCoursesByCategory(categoryName);
        return courses.stream()
                .map(course -> {
                    Integer students = getNumberOfCourseStudents(course.getId());
                    Double rating = getCourseRating(course.getId());
                    Integer reviews = getNumberOfCourseReviewers(course.getId());
                    return new AllCoursesDTO(course, students, rating, reviews);
                })
                .collect(Collectors.toList());
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

    public Long parseLong(String value) {
        try {
            return value != null ? Long.valueOf(value) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }

    public Double parseDouble(String value, Double defaultValue) {
        try {
            return value != null ? Double.valueOf(value) : defaultValue;
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    public Integer parseInteger(String value, Integer defaultValue) {
        try {
            return value != null ? Integer.valueOf(value) : defaultValue;
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    public Boolean parseBoolean(String value, Boolean defaultValue) {
        return value != null ? Boolean.valueOf(value) : defaultValue;
    }

    public Double parseDoubleOneParameter(String value) {
        try {
            return value != null ? Double.valueOf(value) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }

}
