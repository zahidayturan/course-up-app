package com.example.courseup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "teacher_id", referencedColumnName = "id")
    @JsonManagedReference
    private Teacher teacher;

    private String name;
    private String description;
    private String category;
    private Double price;
    private Double discount;
    private String level;
    private String language;
    private String subtitles;
    private Integer totalStages;
    private Integer totalDuration;

    private String image;

    private Boolean is_active;


    @OneToMany(mappedBy = "course")
    @JsonManagedReference
    private List<CourseStages> courseStages;

    @OneToMany(mappedBy = "course")
    @JsonIgnore
    private List<CourseComments> courseComments;

}
