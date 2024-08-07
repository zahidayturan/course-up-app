package com.example.courseup.repository;

import com.example.courseup.model.CourseComments;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseCommentsRepository extends JpaRepository<CourseComments, Long> {

    @Query("SELECT c FROM CourseComments c WHERE c.course.id = :courseId")
    List<CourseComments> findByCourseId(@Param("courseId") Long courseId, Pageable pageable);


}
