package com.example.courseup.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CourseStages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private String name;
    private String description;
    private int duration;
}
