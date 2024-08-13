package com.example.courseup.controller;

import com.example.courseup.model.Course;
import com.example.courseup.model.DTO.AllCoursesDTO;
import com.example.courseup.model.Teacher;
import com.example.courseup.service.CourseService;
import com.example.courseup.service.TeacherService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private TeacherService teacherService;

    @Operation(summary = "Get all course")
    @GetMapping
    public List<Course> findAll() {
        return courseService.findAll();
    }

    @Operation(summary = "Get course by Id")
    @GetMapping("/{id}")
    public AllCoursesDTO findById(@PathVariable Long id) {
        return courseService.getCourseDetails(id);
    }

    @Operation(summary = "Save a new course")
    @PostMapping("/save")
    public ResponseEntity<String> saveCourse(@RequestParam Map<String, String> params) {
        Course course = new Course();
        course.setName(params.get("courseName"));
        course.setDescription(params.get("courseDescription"));
        course.setCategory(params.get("courseCategory"));
        course.setLanguage(params.get("courseLanguage"));
        course.setSubtitles(params.get("courseSubtitles"));

        Double price = courseService.parseDoubleOneParameter(params.get("coursePrice"));
        Double discount = courseService.parseDoubleOneParameter(params.get("courseDiscount"));

        if (price == null || discount == null) {
            return ResponseEntity.badRequest().body("Invalid price or discount value.");
        }

        course.setPrice(price);
        course.setDiscount(discount);
        course.setImageId(params.get("imageId"));

        Long userId = courseService.parseLongOneParameter(params.get("userId"));
        if (userId == null) {
            return ResponseEntity.badRequest().body("Invalid userId value.");
        }

        Teacher teacher = teacherService.findById(userId)
                .orElseThrow(() -> new RuntimeException("Teacher not found."));
        course.setTeacher(teacher);

        course.setTotalStages(null);
        course.setTotalDuration(null);
        course.setIs_active(true);

        String courseId = courseService.save(course).getId().toString();
        return ResponseEntity.ok(courseId);
    }

    @Operation(summary = "Update a course")
    @PostMapping("/update")
    public ResponseEntity<String> updateCourse(@RequestParam Map<String, String> params) {
        Long courseId = courseService.parseLong(params.get("courseId"));
        if (courseId == null) {
            return ResponseEntity.badRequest().body("Invalid courseId value.");
        }

        Course oldCourse = courseService.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("Course with id " + courseId + " not found"));

        Course course = new Course();
        course.setId(courseId);

        course.setName(params.getOrDefault("courseName", oldCourse.getName()));
        course.setDescription(params.getOrDefault("courseDescription", oldCourse.getDescription()));
        course.setCategory(params.getOrDefault("courseCategory", oldCourse.getCategory()));
        course.setLanguage(params.getOrDefault("courseLanguage", oldCourse.getLanguage()));
        course.setSubtitles(params.getOrDefault("courseSubtitles", oldCourse.getSubtitles()));

        course.setPrice(courseService.parseDouble(params.get("coursePrice"), oldCourse.getPrice()));
        course.setDiscount(courseService.parseDouble(params.get("courseDiscount"), oldCourse.getDiscount()));

        course.setImageId(params.getOrDefault("imageId", oldCourse.getImageId()));

        course.setTeacher(
                params.containsKey("userId")
                        ? teacherService.findById(courseService.parseLong(params.get("userId")))
                        .orElseThrow(() -> new RuntimeException("Teacher not found."))
                        : oldCourse.getTeacher()
        );

        course.setIs_active(courseService.parseBoolean(params.get("isActive"), oldCourse.getIs_active()));
        course.setTotalStages(courseService.parseInteger(params.get("totalStages"), oldCourse.getTotalStages()));
        course.setTotalDuration(courseService.parseDouble(params.get("totalDuration"), oldCourse.getTotalDuration()));

        Course updatedCourse = courseService.update(course);
        return ResponseEntity.ok(updatedCourse.getId().toString());
    }

    @Operation(summary = "Delete course by ID")
    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id) {
        courseService.deleteById(id);
    }

    @Operation(summary = "Get all course by User Id")
    @GetMapping("/user/{userId}")
    public List<Course> getCoursesByUserId(@PathVariable Long userId) {
        return courseService.getCoursesByUserId(userId);
    }

    @Operation(summary = "Get all course by Category Name")
    @GetMapping("/category/{categoryName}")
    public List<Course> getCoursesByCategory(@PathVariable String categoryName) {
        return courseService.getCoursesByCategory(categoryName);
    }

    @Operation(summary = "Get 6 popular course")
    @GetMapping("/popular-courses")
    public List<AllCoursesDTO> getTopPopularCourses() {
        return courseService.getTopPopularCourses();
    }
}
