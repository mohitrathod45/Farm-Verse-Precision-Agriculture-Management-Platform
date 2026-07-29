package com.farmverse.farmverse_backend.service;

import com.farmverse.farmverse_backend.dto.FertilizerRequest;
import com.farmverse.farmverse_backend.entity.Fertilizer;

import java.util.List;

public interface FertilizerService {

    String addFertilizer(FertilizerRequest request);

    List<Fertilizer> getAllFertilizers();

    Fertilizer getFertilizerById(Integer fertilizerId);

    String updateFertilizer(Integer fertilizerId, FertilizerRequest request);

    String deleteFertilizer(Integer fertilizerId);
}
