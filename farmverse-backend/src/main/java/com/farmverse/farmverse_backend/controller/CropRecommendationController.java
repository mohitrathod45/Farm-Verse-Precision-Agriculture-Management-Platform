package com.farmverse.farmverse_backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmverse.farmverse_backend.dto.CropRecommendationRequest;
import com.farmverse.farmverse_backend.service.CropRecommendationService;

@RestController
@RequestMapping("/api/crop-recommendation")
@CrossOrigin(origins = "*")
public class CropRecommendationController {

    @Autowired
    private CropRecommendationService cropRecommendationService;

    @PostMapping("/recommend")
    public ResponseEntity<Map<String, Object>> recommendCrop(
            @RequestBody CropRecommendationRequest request) {

        Map<String, Object> recommendation =
                cropRecommendationService.recommendCrop(request);

        return ResponseEntity.ok(recommendation);
    }
}