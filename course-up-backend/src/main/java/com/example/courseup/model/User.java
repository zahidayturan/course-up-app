package com.example.courseup.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "\"user\"")
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surname;

    @JsonIgnore
    private String email;

    @JsonIgnore
    private String password;

    @Column(name = "joining_date")
    private LocalDate joiningDate;

    @PrePersist
    protected void onCreate() {
        if (this.joiningDate == null) {
            this.joiningDate = LocalDate.now();
        }
    }

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private Student student;

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private Teacher teacher;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Basket> baskets;
}

