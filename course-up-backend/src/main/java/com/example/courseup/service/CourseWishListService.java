package com.example.courseup.service;

import com.example.courseup.model.CourseStages;
import com.example.courseup.model.CourseWishList;
import com.example.courseup.model.DTO.CourseStagesDTO;
import com.example.courseup.repository.CourseWishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseWishListService {

    @Autowired
    private CourseWishListRepository courseWishListRepository;

    public List<CourseWishList> findAll() {
        return courseWishListRepository.findAll();
    }

    public Optional<CourseWishList> findById(Long id) {
        return courseWishListRepository.findById(id);
    }

    public CourseWishList save(CourseWishList courseWishList) {
        return courseWishListRepository.save(courseWishList);
    }

    public void deleteById(Long id) {
        courseWishListRepository.deleteById(id);
    }

    public List<CourseStagesDTO> getAllWishListByUserId(Long userId) {
        List<CourseStages> stages = courseWishListRepository.findByUserId(userId);
        return stages.stream()
                .map(CourseStagesDTO::new)
                .collect(Collectors.toList());
    }

    public boolean wishListExists(Long courseId, Long userId) {
        return courseWishListRepository.findByCourseAndUserId(courseId, userId).isPresent();
    }
}
