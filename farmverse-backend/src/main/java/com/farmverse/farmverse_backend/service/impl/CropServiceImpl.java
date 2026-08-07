package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.CropRequest;
import com.farmverse.farmverse_backend.entity.Crop;
import com.farmverse.farmverse_backend.repository.CropRepository;
import com.farmverse.farmverse_backend.repository.FarmRepository;
import com.farmverse.farmverse_backend.security.SecurityUtils;
import com.farmverse.farmverse_backend.service.CropService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CropServiceImpl implements CropService {

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private SecurityUtils securityUtils;

    @Override
    public String addCrop(CropRequest request) {
        if (!securityUtils.isAdmin()) {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            farmRepository.findByFarmIdAndUserId(request.getFarmId(), currentUserId)
                    .orElseThrow(() -> new RuntimeException("Target farm not found or access denied"));
        }

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
        if (securityUtils.isAdmin()) {
            return cropRepository.findAll();
        }
        Integer currentUserId = securityUtils.getAuthenticatedUserId();
        return cropRepository.findByUserId(currentUserId);
    }

    @Override
    public Crop getCropById(Integer cropId) {
        if (securityUtils.isAdmin()) {
            return cropRepository.findById(cropId)
                    .orElseThrow(() -> new RuntimeException("Crop not found"));
        }
        Integer currentUserId = securityUtils.getAuthenticatedUserId();
        return cropRepository.findByCropIdAndUserId(cropId, currentUserId)
                .orElseThrow(() -> new RuntimeException("Crop not found or access denied"));
    }

    @Override
    public String updateCrop(Integer cropId, CropRequest request) {
        Crop crop;
        if (securityUtils.isAdmin()) {
            crop = cropRepository.findById(cropId)
                    .orElseThrow(() -> new RuntimeException("Crop not found"));
        } else {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            crop = cropRepository.findByCropIdAndUserId(cropId, currentUserId)
                    .orElseThrow(() -> new RuntimeException("Crop not found or access denied"));
            farmRepository.findByFarmIdAndUserId(request.getFarmId(), currentUserId)
                    .orElseThrow(() -> new RuntimeException("Target farm not found or access denied"));
        }

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
        Crop crop;
        if (securityUtils.isAdmin()) {
            crop = cropRepository.findById(cropId)
                    .orElseThrow(() -> new RuntimeException("Crop not found"));
        } else {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            crop = cropRepository.findByCropIdAndUserId(cropId, currentUserId)
                    .orElseThrow(() -> new RuntimeException("Crop not found or access denied"));
        }

        cropRepository.delete(crop);

        return "Crop deleted successfully";
    }
}
