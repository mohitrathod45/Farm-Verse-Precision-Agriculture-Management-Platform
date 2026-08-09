package com.farmverse.farmverse_backend.service.impl;

import java.util.HashMap;
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

    public CropRecommendationServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public String recommendCrop(CropRecommendationRequest request) {

        Map<String, Object> requestData = new HashMap<>();

        requestData.put("N", request.getN());
        requestData.put("P", request.getP());
        requestData.put("K", request.getK());
        requestData.put("temperature", request.getTemperature());
        requestData.put("humidity", request.getHumidity());
        requestData.put("ph", request.getPh());
        requestData.put("rainfall", request.getRainfall());

        Map<String, Object> response =
                restTemplate.postForObject(
                        AI_API_URL,
                        requestData,
                        Map.class
                );

        if (response != null &&
                response.containsKey("recommended_crop")) {

            return response.get("recommended_crop").toString();
        }

        return "Unable to get crop recommendation";
    }
}