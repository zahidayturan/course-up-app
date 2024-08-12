package com.example.courseup.service;

import com.example.courseup.exception.ResourceNotFoundException;
import com.example.courseup.model.Basket;
import com.example.courseup.model.Course;
import com.example.courseup.repository.BasketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BasketService {

    @Autowired
    private BasketRepository basketRepository;

    public List<Basket> findAll() {
        return basketRepository.findAll();
    }

    public Optional<Basket> findById(Long id) {
        return basketRepository.findById(id);
    }

    public Basket save(Basket basket) {
        return basketRepository.save(basket);
    }

    public void deleteById(Long id) {
        basketRepository.deleteById(id);
    }

    public List<Basket> getBasketByUserId(Long userId) {
        return basketRepository.findBasketByUserId(userId);
    }

    public Basket updateBasket(Long id, Basket updatedBasket) {
        Optional<Basket> existingBasketOpt = basketRepository.findById(id);
        if (existingBasketOpt.isPresent()) {
            Basket existingBasket = existingBasketOpt.get();

            existingBasket.setCourse(updatedBasket.getCourse());
            existingBasket.setUser(updatedBasket.getUser());

            return basketRepository.save(existingBasket);
        } else {
            throw new ResourceNotFoundException("Basket with id " + id + " not found");
        }
    }

    public boolean basketExists(Long courseId, Long userId) {
        List<Basket> baskets = basketRepository.findByCourseAndUserId(courseId, userId);
        return !baskets.isEmpty();
    }

}
