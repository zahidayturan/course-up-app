package com.example.courseup.repository;

import com.example.courseup.model.CourseWishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseWishListRepository extends JpaRepository<CourseWishList, Long> {

    @Query("SELECT w FROM CourseWishList w WHERE w.user.id = :userId")
    List<CourseWishList> findByUserId(@Param("userId") Long userId);


    @Query("SELECT w FROM CourseWishList w WHERE w.course.id = :courseId AND w.user.id = :userId")
    List<CourseWishList> findByCourseAndUserId(@Param("courseId") Long courseId, @Param("userId") Long userId);
}
