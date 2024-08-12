package com.example.courseup.repository;

import com.example.courseup.model.Basket;
import com.example.courseup.model.CourseWishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BasketRepository extends JpaRepository<Basket, Long> {

    @Query("SELECT b FROM Basket b WHERE b.user.id = :userId")
    List<Basket> findBasketByUserId(@Param("userId") Long userId);

    @Query("SELECT b FROM Basket b WHERE b.course.id = :courseId AND b.user.id = :userId")
    Optional<Basket> findByCourseAndUserId(@Param("courseId") Long courseId, @Param("userId") Long userId);
}
