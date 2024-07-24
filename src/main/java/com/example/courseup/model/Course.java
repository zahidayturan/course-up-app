package com.example.courseup.model;

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
    private Teacher teacher;

    private String name;
    private String description;
    private String category;
    private double price;
    private String level;
    private String language;
    private boolean subtitles;
    private int totalStages;
    private int totalDuration;

    @OneToMany(mappedBy = "course")
    private List<CourseStages> stages;
}
