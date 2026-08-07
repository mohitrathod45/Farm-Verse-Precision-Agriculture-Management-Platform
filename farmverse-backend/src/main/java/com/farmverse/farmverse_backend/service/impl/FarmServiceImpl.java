package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.FarmRequest;
import com.farmverse.farmverse_backend.entity.Farm;
import com.farmverse.farmverse_backend.repository.FarmRepository;
import com.farmverse.farmverse_backend.security.SecurityUtils;
import com.farmverse.farmverse_backend.service.FarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmServiceImpl implements FarmService {

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private SecurityUtils securityUtils;

    @Override
    public String addFarm(FarmRequest request) {
        Integer currentUserId = securityUtils.getAuthenticatedUserId();

        Farm farm = new Farm();
        farm.setUserId(currentUserId);
        farm.setFarmName(request.getFarmName());
        farm.setLocation(request.getLocation());
        farm.setArea(request.getArea());
        farm.setSoilType(request.getSoilType());

        farmRepository.save(farm);

        return "Farm added successfully";
    }

    @Override
    public List<Farm> getAllFarms() {
        if (securityUtils.isAdmin()) {
            return farmRepository.findAll();
        }
        Integer currentUserId = securityUtils.getAuthenticatedUserId();
        return farmRepository.findByUserId(currentUserId);
    }

    @Override
    public Farm getFarmById(Integer farmId) {
        if (securityUtils.isAdmin()) {
            return farmRepository.findById(farmId)
                    .orElseThrow(() -> new RuntimeException("Farm not found"));
        }
        Integer currentUserId = securityUtils.getAuthenticatedUserId();
        return farmRepository.findByFarmIdAndUserId(farmId, currentUserId)
                .orElseThrow(() -> new RuntimeException("Farm not found or access denied"));
    }

    @Override
    public String updateFarm(Integer farmId, FarmRequest request) {
        Farm farm;
        if (securityUtils.isAdmin()) {
            farm = farmRepository.findById(farmId)
                    .orElseThrow(() -> new RuntimeException("Farm not found"));
        } else {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            farm = farmRepository.findByFarmIdAndUserId(farmId, currentUserId)
                    .orElseThrow(() -> new RuntimeException("Farm not found or access denied"));
        }

        if (request.getUserId() != null) {
            farm.setUserId(request.getUserId());
        }
        farm.setFarmName(request.getFarmName());
        farm.setLocation(request.getLocation());
        farm.setArea(request.getArea());
        farm.setSoilType(request.getSoilType());

        farmRepository.save(farm);

        return "Farm updated successfully";
    }

    @Override
    public String deleteFarm(Integer farmId) {
        Farm farm;
        if (securityUtils.isAdmin()) {
            farm = farmRepository.findById(farmId)
                    .orElseThrow(() -> new RuntimeException("Farm not found"));
        } else {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            farm = farmRepository.findByFarmIdAndUserId(farmId, currentUserId)
                    .orElseThrow(() -> new RuntimeException("Farm not found or access denied"));
        }

        farmRepository.delete(farm);

        return "Farm deleted successfully";
    }
}
