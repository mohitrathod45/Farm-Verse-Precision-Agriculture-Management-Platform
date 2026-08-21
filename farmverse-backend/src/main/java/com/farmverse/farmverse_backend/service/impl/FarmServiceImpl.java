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
import com.farmverse.farmverse_backend.repository.UserRepository;
import com.farmverse.farmverse_backend.service.NotificationService;
import com.farmverse.farmverse_backend.entity.User;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

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
        User user = userRepository.findById(currentUserId)
                .orElse(null);

        if (user != null && user.getEmail() != null && !user.getEmail().isBlank()) {
            notificationService.sendFarmNotification(
                    user.getEmail(),
                    "Your farm \"" + farm.getFarmName() + "\" was added successfully."
            );
        }

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

        User user = userRepository.findById(farm.getUserId())
                .orElse(null);

        if (user != null && user.getEmail() != null && !user.getEmail().isBlank()) {
            notificationService.sendFarmNotification(
                    user.getEmail(),
                    "Your farm \"" + farm.getFarmName() + "\" was updated successfully."
            );
        }

        return "Farm updated successfully";
    }

    @Override
    public String deleteFarm(Integer farmId) {
        if (farmId == null || farmId <= 0) {
            throw new IllegalArgumentException("Invalid farm ID specified");
        }

        // 1. Verify existence
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Farm not found with ID: " + farmId
                        ));

        // 2. Verify ownership authorization
        if (!securityUtils.isAdmin()) {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();

            if (!farm.getUserId().equals(currentUserId)) {
                throw new UnauthorizedAccessException(
                        "You are not authorized to delete this farm"
                );
            }
        }

        // 3. Check associated records
        boolean hasCrops = cropRepository.existsByFarmId(farmId);
        boolean hasIrrigation = irrigationRepository.existsByFarmId(farmId);
        boolean hasFertilizer = fertilizerRepository.existsByFarmId(farmId);
        boolean hasReport = reportRepository.existsByFarmId(farmId);

        if (hasCrops || hasIrrigation || hasFertilizer || hasReport) {
            throw new FarmHasAssociatedRecordsException(
                    "Cannot delete this farm because it has associated records " +
                            "(crops, irrigation, fertilizers, or reports)."
            );
        }

        // 4. Get user's email BEFORE deleting the farm
        User user = userRepository.findById(farm.getUserId())
                .orElse(null);

        String userEmail = null;

        if (user != null &&
                user.getEmail() != null &&
                !user.getEmail().isBlank()) {

            userEmail = user.getEmail();
        }

        // Save the farm name before deletion
        String farmName = farm.getFarmName();

        // 5. Delete farm
        try {
            farmRepository.delete(farm);

            // 6. Send email after successful deletion
            if (userEmail != null) {
                notificationService.sendFarmNotification(
                        userEmail,
                        "Your farm \"" + farmName +
                                "\" was deleted successfully."
                );
            }

        } catch (DataIntegrityViolationException e) {
            throw new FarmHasAssociatedRecordsException(
                    "Cannot delete this farm because it has associated records."
            );
        }

        return "Farm deleted successfully";
    }
}
