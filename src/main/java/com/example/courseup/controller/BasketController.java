package com.example.courseup.controller;

import com.example.courseup.model.Basket;
import com.example.courseup.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/basket")
public class BasketController {

    @Autowired
    private BasketService basketService;

    @GetMapping
    public List<Basket> findAll() {
        return basketService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Basket> findById(@PathVariable Long id) {
        return basketService.findById(id);
    }

    @PostMapping
    public Basket save(@RequestBody Basket basket) {
        return basketService.save(basket);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        basketService.deleteById(id);
    }
}
