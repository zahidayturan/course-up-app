package com.example.courseup.repository;

import com.example.courseup.model.Basket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BasketRepository extends JpaRepository<Basket, Long> {

    @Query("SELECT b FROM Basket b WHERE b.user.id = :userId")
    List<Basket> findBasketByUserId(@Param("userId") Long userId);

}
