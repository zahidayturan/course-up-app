package com.example.courseup.repository;

import com.example.courseup.model.Course;
import com.example.courseup.model.Trainee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TraineeRepository extends JpaRepository<Trainee, Long> {

    @Query("SELECT t FROM Trainee t JOIN t.student s WHERE s.user.id = :userId")
    List<Trainee> findTraineeByUserId(@Param("userId") Long userId);

    @Query("SELECT t FROM Trainee t JOIN t.student s WHERE t.isFinished = false AND s.user.id = :userId")
    List<Trainee> findActiveTraineeByUserId(@Param("userId") Long userId);


}
