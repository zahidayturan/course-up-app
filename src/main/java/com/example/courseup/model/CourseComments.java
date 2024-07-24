package com.example.courseup.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CourseComments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "trainee_id")
    private Trainee trainee;

    private String comments;
}