package com.example.courseup.repository;

import com.example.courseup.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("SELECT c FROM Course c JOIN Trainee t ON c.id = t.course.id JOIN Student s ON t.student.id = s.id WHERE s.user.id = :userId")
    List<Course> findCoursesByUserId(@Param("userId") Long userId);

    @Query("SELECT c FROM Course c WHERE c.category = :categoryName")
    List<Course> findCoursesByCategory(@Param("categoryName") String  categoryName);
}
