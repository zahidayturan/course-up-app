package com.example.courseup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CourseFileI {

    @Id
    private String id;

}
