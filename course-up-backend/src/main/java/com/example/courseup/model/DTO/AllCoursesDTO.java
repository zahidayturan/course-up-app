package com.example.courseup.model.DTO;

import com.example.courseup.model.Course;
import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Data
public class AllCoursesDTO {
    private Long id;
    private String name;
    private String instructor;
    private String description;
    private Integer duration;
    private Integer stage;
    private Integer students;
    private Double rating;
    private Integer reviews;
    private Double originalPrice;
    private Double discount;
    private Double discountedPrice;
    private String image;
    private boolean isActive;

    public AllCoursesDTO(Course course, Integer students, Double rating, Integer reviews) {
        this.id = course.getId();
        this.name = course.getName();
        this.instructor = course.getTeacher().getUser().getName() + " " + course.getTeacher().getUser().getSurname();
        this.description = course.getDescription();
        this.duration = course.getTotalDuration();
        this.stage = course.getTotalStages();
        this.students = students;
        this.rating = rating;
        this.reviews = reviews;
        this.originalPrice = course.getPrice();
        this.discount = course.getDiscount();
        this.discountedPrice = calculateDiscountedPrice(course.getPrice(), course.getDiscount());
        this.image = course.getImage();
        this.isActive = course.getIs_active();
    }

    private Double calculateDiscountedPrice(Double originalPrice, Double discount) {
        if (discount == null || discount == 0) {
            return originalPrice;
        }
        BigDecimal originalPriceBD = BigDecimal.valueOf(originalPrice);
        BigDecimal discountBD = BigDecimal.valueOf(discount);
        BigDecimal discountedPrice = originalPriceBD.subtract(originalPriceBD.multiply(discountBD).divide(BigDecimal.valueOf(100)));
        return discountedPrice.setScale(2, RoundingMode.HALF_UP).doubleValue();
    }
}
