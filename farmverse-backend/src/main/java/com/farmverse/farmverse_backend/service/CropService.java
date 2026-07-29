package com.farmverse.farmverse_backend.service;

import com.farmverse.farmverse_backend.dto.CropRequest;
import com.farmverse.farmverse_backend.entity.Crop;

import java.util.List;

public interface CropService {

    String addCrop(CropRequest request);

    List<Crop> getAllCrops();

    Crop getCropById(Integer cropId);

    String updateCrop(Integer cropId, CropRequest request);

    String deleteCrop(Integer cropId);
}
