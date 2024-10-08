package com.example.courseup.service;

import com.example.courseup.model.DTO.AllCoursesDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@EnableScheduling
public class JsonUpdateService {

    @Value("${json.file.path}")
    private String jsonFilePath;

    @Autowired
    private CourseService courseService;

    private final ObjectMapper objectMapper;

    public JsonUpdateService( ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Scheduled(fixedRate = 12 * 60 * 60 * 1000) // 12 hours
    public void updateJsonFile() {
        try {
            List<AllCoursesDTO> topCourses = courseService.getTopPopularCourses();
            File file = new File(jsonFilePath);
            objectMapper.writeValue(file, topCourses);
            System.out.println("JSON dosyası başarıyla güncellendi.");
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("JSON dosyası güncellenemedi.");
        }
    }
}
