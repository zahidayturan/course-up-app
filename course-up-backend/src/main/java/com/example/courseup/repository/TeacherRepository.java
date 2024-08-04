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

}
