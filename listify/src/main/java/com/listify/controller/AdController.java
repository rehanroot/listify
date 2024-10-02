package com.listify.controller;

import com.listify.model.Ad;
import com.listify.service.AdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ads")
public class AdController {

    @Autowired
    private AdService adService;

    @PostMapping
    public ResponseEntity<String> createAd(@RequestBody Ad ad) {
        adService.createAd(ad);
        return ResponseEntity.status(201).body("Ad created successfully");
    }

    @GetMapping
    public ResponseEntity<List<Ad>> getAllAds() {
        List<Ad> ads = adService.getAllAds();
        return ResponseEntity.ok(ads);
    }
}
