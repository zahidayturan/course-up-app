package com.example.courseup.repository;

import com.example.courseup.model.CourseComments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseCommentsRepository extends JpaRepository<CourseComments, Long> {
}
