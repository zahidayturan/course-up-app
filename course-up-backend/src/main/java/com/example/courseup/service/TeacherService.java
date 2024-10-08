package com.example.courseup.service;

import com.example.courseup.model.Course;
import com.example.courseup.model.DTO.AllCoursesDTO;
import com.example.courseup.model.DTO.TeacherDTO;
import com.example.courseup.model.Teacher;
import com.example.courseup.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private CourseService courseService;

    public List<Teacher> findAll() {
        return teacherRepository.findAll();
    }

    public Optional<Teacher> findById(Long id) {return teacherRepository.findById(id);}
    public Optional<Teacher> findByUserId(Long id) {return teacherRepository.findByUserId(id);}

    public Teacher save(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public void deleteById(Long id) {
        teacherRepository.deleteById(id);
    }

    public boolean checkIsTeacher(Long userId) {
        return teacherRepository.checkIsTeacher(userId);
    }

    public List<AllCoursesDTO> getTeacherCourses(Long userId) {
        List<Course> courses = teacherRepository.findTeacherCourses(userId);
        return courses.stream()
                .map(course -> {
                    Integer students = courseService.getNumberOfCourseStudents(course.getId());
                    Double rating = courseService.getCourseRating(course.getId());
                    Integer reviews = courseService.getNumberOfCourseReviewers(course.getId());
                    return new AllCoursesDTO(course, students, rating, reviews);
                })
                .collect(Collectors.toList());
    }

    public TeacherDTO getTeacherInfo(Long id) {
        return findById(id)
                .map(teacher -> {
                    Integer numberOfCourses = getNumberOfTeacherCourses(id);
                    int numberOfStudents = numberOfCourses > 0 ? getNumberOfTeacherStudents(id) : 0;
                    double rating = numberOfStudents > 0 ? getNumberOfTeacherRatings(id) : 0.0;
                    return new TeacherDTO(
                            teacher,
                            rating,
                            numberOfStudents,
                            numberOfCourses
                    );
                })
                .orElse(null);
    }

    public double getNumberOfTeacherRatings(Long id) {
        Double rating = teacherRepository.findTeacherRating(id);
        return rating != null ? roundToTwoDecimalPlaces(rating) : 0.0;
    }

    private double roundToTwoDecimalPlaces(double value) {
        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(2, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

    public Integer getNumberOfTeacherStudents(Long id) {
        return teacherRepository.findNumberOfTeacherStudents(id);
    }

    public Integer getNumberOfTeacherCourses(Long id) {
        return teacherRepository.findNumberOfTeacherCourses(id);
    }

}
