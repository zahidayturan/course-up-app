package com.example.courseup.service;

import com.example.courseup.model.Course;
import com.example.courseup.repository.CourseRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class JsonUpdateService {

    @Value("${json.file.path}")
    private String jsonFilePath;

    private final CourseRepository courseRepository;
    private final ObjectMapper objectMapper;

    public JsonUpdateService(CourseRepository courseRepository, ObjectMapper objectMapper) {
        this.courseRepository = courseRepository;
        this.objectMapper = objectMapper;
    }

    @Scheduled(fixedRate = 12 * 60 * 60 * 1000)
    public void updateJsonFile() {
        try {
            List<Course> topCourses = courseRepository.findTopCoursesByPopularity();
            File file = new File(jsonFilePath);
            objectMapper.writeValue(file, topCourses);
            System.out.println("JSON dosyası başarıyla güncellendi.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
