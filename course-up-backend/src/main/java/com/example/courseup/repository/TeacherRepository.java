package com.example.courseup.repository;

import com.example.courseup.model.Course;
import com.example.courseup.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    @Query("SELECT CASE WHEN COUNT(t) > 0 THEN true ELSE false END FROM Teacher t WHERE t.user.id = :userId")
    boolean checkIsTeacher(@Param("userId") Long userId);
    @Query("SELECT c FROM Course c WHERE c.teacher.id = (SELECT t.id FROM Teacher t WHERE t.user.id = :userId)")
    List<Course> findTeacherCourses(@Param("userId") Long userId);

    @Query("SELECT AVG(t.coursePoint) FROM Trainee t WHERE t.course IN (SELECT c FROM Course c WHERE c.teacher.id = :teacherId) AND t.isFinished = true AND t.coursePoint > 0")
    Double findTeacherRating(@Param("teacherId") Long teacherId);

    @Query("SELECT COUNT(t) FROM Trainee t WHERE t.course.teacher.id = :teacherId")
    Integer findNumberOfTeacherStudents(@Param("teacherId") Long teacherId);

    @Query("SELECT COUNT(c) FROM Course c WHERE c.teacher.id = :teacherId")
    Integer findNumberOfTeacherCourses(@Param("teacherId") Long teacherId);

}
