package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.FarmRequest;
import com.farmverse.farmverse_backend.entity.Farm;
import com.farmverse.farmverse_backend.repository.FarmRepository;
import com.farmverse.farmverse_backend.service.FarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmServiceImpl implements FarmService {

    @Autowired
    private FarmRepository farmRepository;

    @Override
    public String addFarm(FarmRequest request) {

        Farm farm = new Farm();
        farm.setUserId(request.getUserId());
        farm.setFarmName(request.getFarmName());
        farm.setLocation(request.getLocation());
        farm.setArea(request.getArea());
        farm.setSoilType(request.getSoilType());

        farmRepository.save(farm);

        return "Farm added successfully";
    }

    @Override
    public List<Farm> getAllFarms() {
        return farmRepository.findAll();
    }

    @Override
    public Farm getFarmById(Integer farmId) {

        return farmRepository.findById(farmId)
                .orElseThrow(() -> new RuntimeException("Farm not found"));
    }

    @Override
    public String updateFarm(Integer farmId, FarmRequest request) {

        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new RuntimeException("Farm not found"));

        farm.setUserId(request.getUserId());
        farm.setFarmName(request.getFarmName());
        farm.setLocation(request.getLocation());
        farm.setArea(request.getArea());
        farm.setSoilType(request.getSoilType());

        farmRepository.save(farm);

        return "Farm updated successfully";
    }

    @Override
    public String deleteFarm(Integer farmId) {

        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new RuntimeException("Farm not found"));

        farmRepository.delete(farm);

        return "Farm deleted successfully";
    }
}
