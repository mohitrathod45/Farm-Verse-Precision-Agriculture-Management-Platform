package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.FarmRequest;
import com.farmverse.farmverse_backend.entity.Farm;
import com.farmverse.farmverse_backend.exception.FarmHasAssociatedRecordsException;
import com.farmverse.farmverse_backend.exception.ResourceNotFoundException;
import com.farmverse.farmverse_backend.exception.UnauthorizedAccessException;
import com.farmverse.farmverse_backend.repository.CropRepository;
import com.farmverse.farmverse_backend.repository.FarmRepository;
import com.farmverse.farmverse_backend.repository.FertilizerRepository;
import com.farmverse.farmverse_backend.repository.IrrigationRepository;
import com.farmverse.farmverse_backend.repository.ReportRepository;
import com.farmverse.farmverse_backend.security.SecurityUtils;
import com.farmverse.farmverse_backend.service.FarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmServiceImpl implements FarmService {

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private IrrigationRepository irrigationRepository;

    @Autowired
    private FertilizerRepository fertilizerRepository;

    @Autowired
    private ReportRepository reportRepository;

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
        if (farmId == null || farmId <= 0) {
            throw new IllegalArgumentException("Invalid farm ID specified");
        }

        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new ResourceNotFoundException("Farm not found with ID: " + farmId));

        if (!securityUtils.isAdmin()) {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            if (!farm.getUserId().equals(currentUserId)) {
                throw new UnauthorizedAccessException("You are not authorized to access this farm");
            }
        }
        return farm;
    }

    @Override
    public String updateFarm(Integer farmId, FarmRequest request) {
        if (farmId == null || farmId <= 0) {
            throw new IllegalArgumentException("Invalid farm ID specified");
        }

        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new ResourceNotFoundException("Farm not found with ID: " + farmId));

        if (!securityUtils.isAdmin()) {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            if (!farm.getUserId().equals(currentUserId)) {
                throw new UnauthorizedAccessException("You are not authorized to update this farm");
            }
        }

        if (request.getUserId() != null && securityUtils.isAdmin()) {
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
        if (farmId == null || farmId <= 0) {
            throw new IllegalArgumentException("Invalid farm ID specified");
        }

        // 1. Verify existence
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new ResourceNotFoundException("Farm not found with ID: " + farmId));

        // 2. Verify ownership authorization
        if (!securityUtils.isAdmin()) {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            if (!farm.getUserId().equals(currentUserId)) {
                throw new UnauthorizedAccessException("You are not authorized to delete this farm");
            }
        }

        // 3. Application-level safety check for foreign-key / dependent records
        boolean hasCrops = cropRepository.existsByFarmId(farmId);
        boolean hasIrrigation = irrigationRepository.existsByFarmId(farmId);
        boolean hasFertilizer = fertilizerRepository.existsByFarmId(farmId);
        boolean hasReport = reportRepository.existsByFarmId(farmId);

        if (hasCrops || hasIrrigation || hasFertilizer || hasReport) {
            throw new FarmHasAssociatedRecordsException("Cannot delete this farm because it has associated records (crops, irrigation, fertilizers, or reports).");
        }

        // 4. Safe delete with exception fallback
        try {
            farmRepository.delete(farm);
        } catch (DataIntegrityViolationException e) {
            throw new FarmHasAssociatedRecordsException("Cannot delete this farm because it has associated records.");
        }

        return "Farm deleted successfully";
    }
}
