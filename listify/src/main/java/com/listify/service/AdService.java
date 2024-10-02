package com.listify.service;

import com.listify.model.Ad;
import com.listify.repository.AdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdService {

    @Autowired
    private AdRepository adRepository;

    public void createAd(Ad ad) {
        adRepository.save(ad);
    }

    public List<Ad> getAllAds() {
        return adRepository.findAll();
    }
}
