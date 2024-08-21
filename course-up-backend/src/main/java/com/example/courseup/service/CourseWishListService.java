package com.example.courseup.service;

import com.example.courseup.model.CourseWishList;
import com.example.courseup.model.DTO.CourseWishListDTO;
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

    public List<CourseWishListDTO> getAllWishListByUserId(Long userId) {
        List<CourseWishList> courses = courseWishListRepository.findByUserId(userId);
        return courses.stream()
                .map(courseWishList -> new CourseWishListDTO(courseWishList.getId(),courseWishList.getCourse()))
                .collect(Collectors.toList());
    }

    public boolean wishListExists(Long courseId, Long userId) {
        List<CourseWishList> courseWishLists = courseWishListRepository.findByCourseAndUserId(courseId, userId);
        return !courseWishLists.isEmpty();
    }
}
