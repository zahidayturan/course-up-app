package com.example.courseup.repository;

import com.example.courseup.model.CourseStages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CourseStagesRepository extends JpaRepository<CourseStages, Long> {
    @Query("SELECT s FROM CourseStages s WHERE s.course.id = :courseId")
    List<CourseStages> findByCourseId(@Param("courseId") Long courseId);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("DELETE FROM CourseStages s WHERE s.course.id = :courseId")
    void deleteByCourseId(@Param("courseId") Long courseId);


}

