package com.farmverse.farmverse_backend.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.farmverse.farmverse_backend.dto.CropRecommendationRequest;
import com.farmverse.farmverse_backend.service.CropRecommendationService;

@Service
public class CropRecommendationServiceImpl
        implements CropRecommendationService {

    private final RestTemplate restTemplate;

    private static final String AI_API_URL =
            "http://127.0.0.1:5000/predict";

    public CropRecommendationServiceImpl(
            RestTemplate restTemplate) {

        this.restTemplate = restTemplate;
    }

    @Override
    public Map<String, Object> recommendCrop(
            CropRecommendationRequest request) {

        Map<String, Object> requestData =
                new HashMap<>();

        requestData.put("N", request.getN());
        requestData.put("P", request.getP());
        requestData.put("K", request.getK());
        requestData.put(
                "temperature",
                request.getTemperature()
        );
        requestData.put(
                "humidity",
                request.getHumidity()
        );
        requestData.put(
                "ph",
                request.getPh()
        );
        requestData.put(
                "rainfall",
                request.getRainfall()
        );

        try {
            Map<String, Object> response =
                    restTemplate.postForObject(
                            AI_API_URL,
                            requestData,
                            Map.class
                    );

            if (response != null && !response.isEmpty()) {
                return response;
            }
        } catch (Exception e) {
            System.err.println(
                    "[CropRecommendation] AI service on port 5000 unavailable: "
                            + e.getMessage()
                            + ". Falling back to rule-based recommendation engine."
            );
        }

        return getFallbackRecommendation(request);
    }

    private Map<String, Object> getFallbackRecommendation(
            CropRecommendationRequest request) {

        double temp = request.getTemperature();
        double humidity = request.getHumidity();
        double ph = request.getPh();
        double rain = request.getRainfall();
        double n = request.getN();

        String recommendedCrop;
        List<Map<String, Object>> top3Crops = new ArrayList<>();

        if (rain > 150 && temp >= 20 && temp <= 35 && ph >= 5.5 && ph <= 7.5) {
            recommendedCrop = "Rice";
            top3Crops.add(createCropMap("Rice", 95));
            top3Crops.add(createCropMap("Jute", 88));
            top3Crops.add(createCropMap("Papaya", 82));
        } else if (temp >= 10 && temp <= 25 && rain < 100 && n >= 60) {
            recommendedCrop = "Wheat";
            top3Crops.add(createCropMap("Wheat", 92));
            top3Crops.add(createCropMap("Maize", 85));
            top3Crops.add(createCropMap("Chickpea", 78));
        } else if (temp >= 20 && temp <= 32 && humidity >= 60 && n >= 70) {
            recommendedCrop = "Maize";
            top3Crops.add(createCropMap("Maize", 94));
            top3Crops.add(createCropMap("Cotton", 86));
            top3Crops.add(createCropMap("Soyabean", 80));
        } else if (temp >= 21 && temp <= 35 && rain >= 50 && rain <= 110) {
            recommendedCrop = "Cotton";
            top3Crops.add(createCropMap("Cotton", 91));
            top3Crops.add(createCropMap("Groundnut", 84));
            top3Crops.add(createCropMap("Maize", 79));
        } else if (temp >= 25 && temp <= 35 && humidity >= 70) {
            recommendedCrop = "Papaya";
            top3Crops.add(createCropMap("Papaya", 93));
            top3Crops.add(createCropMap("Banana", 87));
            top3Crops.add(createCropMap("Coconut", 81));
        } else {
            recommendedCrop = "Watermelon";
            top3Crops.add(createCropMap("Watermelon", 89));
            top3Crops.add(createCropMap("Muskmelon", 83));
            top3Crops.add(createCropMap("Tomato", 76));
        }

        Map<String, Object> result = new HashMap<>();
        result.put("recommended_crop", recommendedCrop);
        result.put("recommendation", recommendedCrop);
        result.put("top_3_crops", top3Crops);

        return result;
    }

    private Map<String, Object> createCropMap(String cropName, int score) {
        Map<String, Object> map = new HashMap<>();
        map.put("crop", cropName);
        map.put("score", score);
        return map;
    }
}