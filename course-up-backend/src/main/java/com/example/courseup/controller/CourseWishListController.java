package com.example.courseup.controller;

import com.example.courseup.model.Course;
import com.example.courseup.model.CourseWishList;
import com.example.courseup.model.DTO.CourseWishListDTO;
import com.example.courseup.model.User;
import com.example.courseup.service.CourseService;
import com.example.courseup.service.CourseWishListService;
import com.example.courseup.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/course-wish-list")
public class CourseWishListController {

    @Autowired
    private CourseWishListService courseWishListService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private UserService userService;


    @Operation(summary = "Get all course wish lists by userId")
    @GetMapping("/all/{userId}")
    public List<CourseWishListDTO> findAll(@PathVariable Long userId) {
        return courseWishListService.getAllWishListByUserId(userId);
    }


    @Operation(summary = "Save a new course stage")
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestParam Map<String, String> params) {
        CourseWishList courseWishList = new CourseWishList();

        long userId;
        try {
            userId = Long.parseLong(params.get("userId"));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid userId value.");
        }

        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));
        courseWishList.setUser(user);

        long courseId;
        try {
            courseId = Long.parseLong(params.get("courseId"));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid courseId value .");
        }

        Course course = courseService.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found."));
        courseWishList.setCourse(course);

        if(!courseWishListService.wishListExists(courseId,userId)){
            String courseStageId = courseWishListService.save(courseWishList).getId().toString();
            return ResponseEntity.ok(courseStageId);
        } else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already on wish list");
        }
    }

    @Operation(summary = "Check course in wish list")
    @GetMapping("/check/{courseId}/{userId}")
    public ResponseEntity<String> checkCourseInWishList(@PathVariable Long courseId, @PathVariable Long userId) {
        if (courseWishListService.wishListExists(courseId, userId)) {
            return ResponseEntity.ok("true");
        }else {
            return ResponseEntity.ok("false");
        }
    }

    @Operation(summary = "Delete a course from the wish list by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        try {
            courseWishListService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
