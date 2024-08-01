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

    @Query(value = "SELECT c FROM Course c LEFT JOIN FETCH c.courseStages WHERE c.id IN (SELECT course.id FROM Trainee GROUP BY course.id ORDER BY COUNT(course.id) DESC LIMIT 6)")
    List<Course> findTopCoursesByPopularity();

    @Query("SELECT COUNT(t) FROM Trainee t WHERE t.course.id = :courseId")
    Integer findNumberOfCourseStudents(@Param("courseId") Long courseId);

    @Query("SELECT COUNT(t) FROM Trainee t WHERE t.course.id = :courseId AND t.isFinished = true AND t.coursePoint > 0")
    Integer findNumberOfCourseReviewers(@Param("courseId") Long courseId);

    @Query("SELECT AVG(t.coursePoint) FROM Trainee t WHERE t.course.id = :courseId AND t.isFinished = true AND t.coursePoint > 0")
    Double findCourseRating(@Param("courseId") Long courseId);
}
