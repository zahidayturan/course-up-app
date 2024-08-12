package com.example.courseup.model.DTO;

import com.example.courseup.model.Basket;
import com.example.courseup.model.Course;
import lombok.Data;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Data
public class BasketDTO {

    private Long id;
    private Long courseId;
    private String name;
    private String description;
    private String teacher;
    private String category;
    private String imageId;
    private Double originalPrice;
    private Double discount;
    private Double discountedPrice;

    public BasketDTO(Basket basket) {
        this.id = basket.getId();
        this.courseId = basket.getCourse().getId();
        this.name = basket.getCourse().getName();
        this.description= basket.getCourse().getDescription();
        this.teacher = basket.getCourse().getTeacher().getUser().getName()+" "+basket.getCourse().getTeacher().getUser().getSurname();
        this.category = basket.getCourse().getCategory();
        this.imageId = basket.getCourse().getImageId();
        this.originalPrice = basket.getCourse().getPrice();
        this.discount = basket.getCourse().getDiscount();
        this.discountedPrice = calculateDiscountedPrice(basket.getCourse().getPrice(), basket.getCourse().getDiscount());
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
