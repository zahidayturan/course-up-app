package com.example.courseup.controller;

import com.example.courseup.exception.ResourceNotFoundException;
import com.example.courseup.model.Basket;
import com.example.courseup.model.Course;
import com.example.courseup.model.DTO.BasketDTO;
import com.example.courseup.model.User;
import com.example.courseup.service.BasketService;
import com.example.courseup.service.CourseService;
import com.example.courseup.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/basket")
public class BasketController {

    @Autowired
    private BasketService basketService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private UserService userService;

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
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestParam Map<String, String> params) {
        Basket basket = new Basket();

        long userId;
        try {
            userId = Long.parseLong(params.get("userId"));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid userId value.");
        }

        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found ."));
        basket.setUser(user);

        long courseId;
        try {
            courseId = Long.parseLong(params.get("courseId"));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid courseId value .");
        }

        Course course = courseService.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found."));
        basket.setCourse(course);


        if(!basketService.basketExists(courseId,userId)){
            String basketId = basketService.save(basket).getId().toString();
            return ResponseEntity.ok(basketId);
        } else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already on basket");
        }
    }

    @Operation(summary = "Delete basket by ID")
    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Long id) {
        basketService.deleteById(id);
    }

    @Operation(summary = "Get all basket by User Id")
    @GetMapping("/user/{userId}")
    public List<BasketDTO> getBasketByUserId(@PathVariable Long userId) {
        return basketService.getBasketByUserId(userId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Basket> updateBasket(@PathVariable Long id, @RequestBody Basket updatedBasket) {
        try {
            Basket basket = basketService.updateBasket(id, updatedBasket);
            return new ResponseEntity<>(basket, HttpStatus.OK);
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Check course in basket")
    @GetMapping("/check/{courseId}/{userId}")
    public ResponseEntity<String> checkCourseInBasket(@PathVariable Long courseId, @PathVariable Long userId) {
        if (basketService.basketExists(courseId, userId)) {
            return ResponseEntity.ok("true");
        }else {
            return ResponseEntity.ok("false");
        }
    }
}
