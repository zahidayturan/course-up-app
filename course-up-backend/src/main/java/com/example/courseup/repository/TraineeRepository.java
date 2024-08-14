package com.example.courseup.repository;

import com.example.courseup.model.CourseWishList;
import com.example.courseup.model.Trainee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TraineeRepository extends JpaRepository<Trainee, Long> {

    @Query("SELECT t FROM Trainee t WHERE t.user.id = :userId")
    List<Trainee> findTraineeByUserId(@Param("userId") Long userId);

    @Query("SELECT t FROM Trainee t JOIN t.user u WHERE t.isFinished = false AND u.id = :userId")
    List<Trainee> findActiveTraineeByUserId(@Param("userId") Long userId);

    @Query("SELECT t FROM Trainee t WHERE t.course.id = :courseId AND t.user.id = :userId")
    List<Trainee> findByCourseAndUserId(@Param("courseId") Long courseId, @Param("userId") Long userId);


}
