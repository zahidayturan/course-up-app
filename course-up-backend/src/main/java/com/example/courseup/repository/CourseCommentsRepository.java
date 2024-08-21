package com.example.courseup.repository;

import com.example.courseup.model.CourseComments;
import com.example.courseup.model.CourseWishList;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseCommentsRepository extends JpaRepository<CourseComments, Long> {

    @Query("SELECT c FROM CourseComments c WHERE c.course.id = :courseId")
    List<CourseComments> findByCourseId(@Param("courseId") Long courseId, Pageable pageable);


    @Query("SELECT w FROM CourseComments w WHERE w.trainee.id = :traineeId")
    CourseComments findByTrainee(@Param("traineeId") Long traineeId);

    @Query("SELECT c FROM CourseComments c WHERE c.trainee.user.id= :userId")
    List<CourseComments> findByUserId(@Param("userId") Long userId);

}
