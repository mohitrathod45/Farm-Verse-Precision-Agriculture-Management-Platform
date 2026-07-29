package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.CropRequest;
import com.farmverse.farmverse_backend.entity.Crop;
import com.farmverse.farmverse_backend.repository.CropRepository;
import com.farmverse.farmverse_backend.service.CropService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CropServiceImpl implements CropService {

    @Autowired
    private CropRepository cropRepository;

    @Override
    public String addCrop(CropRequest request) {

        Crop crop = new Crop();
        crop.setFarmId(request.getFarmId());
        crop.setCropName(request.getCropName());
        crop.setSeason(request.getSeason());
        crop.setSowingDate(request.getSowingDate());
        crop.setHarvestingDate(request.getHarvestingDate());
        crop.setStatus(request.getStatus());

        cropRepository.save(crop);

        return "Crop added successfully";
    }

    @Override
    public List<Crop> getAllCrops() {
        return cropRepository.findAll();
    }

    @Override
    public Crop getCropById(Integer cropId) {

        return cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop not found"));
    }

    @Override
    public String updateCrop(Integer cropId, CropRequest request) {

        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop not found"));

        crop.setFarmId(request.getFarmId());
        crop.setCropName(request.getCropName());
        crop.setSeason(request.getSeason());
        crop.setSowingDate(request.getSowingDate());
        crop.setHarvestingDate(request.getHarvestingDate());
        crop.setStatus(request.getStatus());

        cropRepository.save(crop);

        return "Crop updated successfully";
    }

    @Override
    public String deleteCrop(Integer cropId) {

        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop not found"));

        cropRepository.delete(crop);

        return "Crop deleted successfully";
    }
}
