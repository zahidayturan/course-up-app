package com.example.courseup.controller;

import com.example.courseup.model.Course;
import com.example.courseup.model.DTO.AllCoursesDTO;
import com.example.courseup.model.Teacher;
import com.example.courseup.service.CourseService;
import com.example.courseup.service.TeacherService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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
        course.setSubtitles("courseSubtitles");

        try {
            course.setPrice(Double.valueOf(params.get("coursePrice")));
            course.setDiscount(Double.valueOf(params.get("courseDiscount")));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid price or discount value.");
        }

        course.setImageId(params.get("imageId"));

        long userId;
        try {
            System.out.println(params.get("userId"));
            userId = Long.parseLong(params.get("userId"));
        } catch (NumberFormatException e) {
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

    @Operation(summary = "Delete course by ID")
    @DeleteMapping("/{id}")
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
