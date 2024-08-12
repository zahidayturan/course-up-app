package com.example.courseup.model.DTO;

import com.example.courseup.model.Course;
import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Data
public class CourseWishListDTO {

    private Long id;
    private Long courseId;
    private String name;
    private String description;
    private String imageId;
    private Double originalPrice;
    private Double discount;
    private Double discountedPrice;

    public CourseWishListDTO(Long id,Course course) {
        this.id = id;
        this.courseId = course.getId();
        this.name = course.getName();
        this.description = course.getDescription();
        this.imageId= course.getImageId();
        this.originalPrice = course.getPrice();
        this.discount = course.getDiscount();
        this.discountedPrice = calculateDiscountedPrice(course.getPrice(), course.getDiscount());
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
