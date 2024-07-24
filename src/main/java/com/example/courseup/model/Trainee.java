package com.example.courseup.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Trainee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "course_id")
    private Course course;

    private int currentDuration;
    private int currentStages;
    private double coursePoint;
    private boolean isFinished;
}