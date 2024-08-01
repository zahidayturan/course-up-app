package com.example.courseup.model.DTO;

import com.example.courseup.model.Course;
import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Data
public class PopularCoursesDTO {

    private Long id;
    private String name;
    private String instructor;
    private String description;
    private Integer duration;
    private Integer students;
    private Double rating;
    private Integer reviews;
    private Double originalPrice;
    private Double discount;
    private Double discountedPrice;
    private String image;
    public PopularCoursesDTO(Course course) {
        this.id = course.getId();
        this.name = course.getName();
        this.instructor = course.getTeacher().getUser().getName()+" "+course.getTeacher().getUser().getSurname();
        this.description = course.getDescription();
        this.duration = course.getTotalDuration();
        this.students = 150;
        this.rating = 4.1;
        this.reviews = 159;
        this.originalPrice = course.getPrice();
        this.discount = course.getDiscount();
        this.discountedPrice = calculateDiscountedPrice(course.getPrice(), course.getDiscount());
        this.image = course.getImage();
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