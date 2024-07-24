package com.example.courseup.controller;

import com.example.courseup.model.Basket;
import com.example.courseup.service.BasketService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/basket")
public class BasketController {

    @Autowired
    private BasketService basketService;

    @Operation(summary = "Get all baskets")
    @GetMapping
    public List<Basket> findAll() {
        return basketService.findAll();
    }

    @Operation(summary = "Get basket by ID")
    @GetMapping("/{id}")
    public Optional<Basket> findById(@PathVariable Long id) {
        return basketService.findById(id);
    }

    @Operation(summary = "Save a new basket")
    @PostMapping
    public Basket save(@RequestBody Basket basket) {
        return basketService.save(basket);
    }

    @Operation(summary = "Delete basket by ID")
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        basketService.deleteById(id);
    }
}
