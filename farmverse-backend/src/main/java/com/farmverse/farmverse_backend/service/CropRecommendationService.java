package com.farmverse.farmverse_backend.service;

import java.util.Map;

import com.farmverse.farmverse_backend.dto.CropRecommendationRequest;

public interface CropRecommendationService {

    Map<String, Object> recommendCrop(
            CropRecommendationRequest request
    );

}