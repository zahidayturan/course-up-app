package com.example.courseup.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    @JsonBackReference
    private Teacher teacher;

    private String name;
    private String description;
    private String category;
    private double price;
    private String level;
    private String language;
    private String subtitles;
    private int totalStages;
    private int totalDuration;

    @OneToMany(mappedBy = "course")
    @JsonManagedReference
    private List<CourseStages> stages;

    @OneToMany(mappedBy = "course")
    @JsonManagedReference
    private List<Basket> baskets;

    @OneToMany(mappedBy = "course")
    @JsonManagedReference
    private List<CourseComments> comments;
}