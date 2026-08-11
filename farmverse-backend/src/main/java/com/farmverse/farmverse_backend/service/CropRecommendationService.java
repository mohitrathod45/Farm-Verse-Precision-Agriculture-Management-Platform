package com.farmverse.farmverse_backend.service;

import com.farmverse.farmverse_backend.dto.CropRecommendationRequest;

public interface CropRecommendationService {

    String recommendCrop(CropRecommendationRequest request);

}