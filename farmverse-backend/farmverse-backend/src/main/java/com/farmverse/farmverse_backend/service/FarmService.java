package com.farmverse.farmverse_backend.service;

import com.farmverse.farmverse_backend.dto.FarmRequest;
import com.farmverse.farmverse_backend.entity.Farm;

import java.util.List;

public interface FarmService {

    String addFarm(FarmRequest request);

    List<Farm> getAllFarms();

    Farm getFarmById(Integer farmId);

    String updateFarm(Integer farmId, FarmRequest request);

    String deleteFarm(Integer farmId);
}