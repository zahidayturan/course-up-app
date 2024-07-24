package com.example.courseup.service;

import com.example.courseup.model.Basket;
import com.example.courseup.repository.BasketRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

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

}
