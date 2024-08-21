package com.example.courseup.repository;

import com.example.courseup.model.Course;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("SELECT c FROM Course c JOIN Trainee t ON c.id = t.course.id JOIN User u ON t.user.id = u.id WHERE u.id = :userId")
    List<Course> findCoursesByUserId(@Param("userId") Long userId);

    @Query("SELECT c FROM Course c WHERE c.category = :categoryName")
    List<Course> findCoursesByCategory(@Param("categoryName") String  categoryName);

    @Query("SELECT t.course.id FROM Trainee t GROUP BY t.course.id ORDER BY COUNT(t.course.id) DESC")
    List<Long> findTopCourseIdsByPopularity(Pageable pageable);

    @Query("SELECT DISTINCT c FROM Course c WHERE c.is_active = true AND c.id IN :ids")
    List<Course> findCoursesWithStagesByIds(@Param("ids") List<Long> ids);


    @Query("SELECT COUNT(t) FROM Trainee t WHERE t.course.id = :courseId")
    Integer findNumberOfCourseStudents(@Param("courseId") Long courseId);

    @Query("SELECT COUNT(t) FROM Trainee t WHERE t.course.id = :courseId AND t.isFinished = true AND t.coursePoint > 0")
    Integer findNumberOfCourseReviewers(@Param("courseId") Long courseId);

    @Query("SELECT AVG(t.coursePoint) FROM Trainee t WHERE t.course.id = :courseId AND t.isFinished = true AND t.coursePoint > 0")
    Double findCourseRating(@Param("courseId") Long courseId);

    @Query("SELECT c FROM Course c WHERE " +
            "LOWER(c.name) LIKE LOWER(CONCAT('%', :keywords, '%')) " +
            "OR LOWER(c.description) LIKE LOWER(CONCAT('%', :keywords, '%')) " +
            "OR LOWER(c.category) LIKE LOWER(CONCAT('%', :keywords, '%')) " +
            "OR LOWER(c.teacher.user.name) LIKE LOWER(CONCAT('%', :keywords, '%')) " +
            "OR LOWER(c.teacher.user.surname) LIKE LOWER(CONCAT('%', :keywords, '%'))")
    List<Course> search(@Param("keywords") String keywords);


}
