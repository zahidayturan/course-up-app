package com.example.courseup.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CourseComments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "trainee_id")
    private Trainee trainee;

    private String comments;
}