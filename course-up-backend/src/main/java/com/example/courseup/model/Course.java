package com.example.courseup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Data
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "teacher_id", referencedColumnName = "id")
    @JsonIgnore
    private Teacher teacher;

    private String name;
    private String description;
    private String category;
    private Double price;
    private Double discount;
    private String language;
    private String subtitles;
    private Integer totalStages;
    private Integer totalDuration;

    private String imageId;

    private Boolean is_active;
}
