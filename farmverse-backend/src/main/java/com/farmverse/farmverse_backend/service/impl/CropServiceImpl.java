package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.CropRequest;
import com.farmverse.farmverse_backend.entity.Crop;
import com.farmverse.farmverse_backend.entity.User;
import com.farmverse.farmverse_backend.repository.CropRepository;
import com.farmverse.farmverse_backend.repository.FarmRepository;
import com.farmverse.farmverse_backend.repository.UserRepository;
import com.farmverse.farmverse_backend.security.SecurityUtils;
import com.farmverse.farmverse_backend.service.CropService;
import com.farmverse.farmverse_backend.service.NotificationService;

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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    @Override
    public String addCrop(CropRequest request) {

        Integer currentUserId =
                securityUtils.getAuthenticatedUserId();

        if (!securityUtils.isAdmin()) {

            farmRepository.findByFarmIdAndUserId(
                    request.getFarmId(),
                    currentUserId
            ).orElseThrow(() ->
                    new RuntimeException(
                            "Target farm not found or access denied"
                    )
            );
        }

        Crop crop = new Crop();

        crop.setFarmId(request.getFarmId());
        crop.setCropName(request.getCropName());
        crop.setSeason(request.getSeason());
        crop.setSowingDate(request.getSowingDate());
        crop.setHarvestingDate(request.getHarvestingDate());
        crop.setStatus(request.getStatus());

        cropRepository.save(crop);

        // Get current user's email
        User user = userRepository.findById(currentUserId)
                .orElse(null);

        // Send email notification
        if (user != null &&
                user.getEmail() != null &&
                !user.getEmail().isBlank()) {

            notificationService.sendCropNotification(
                    user.getEmail(),
                    "Your crop \"" +
                            crop.getCropName() +
                            "\" was added successfully."
            );
        }

        return "Crop added successfully";
    }

    @Override
    public List<Crop> getAllCrops() {

        if (securityUtils.isAdmin()) {
            return cropRepository.findAll();
        }

        Integer currentUserId =
                securityUtils.getAuthenticatedUserId();

        return cropRepository.findByUserId(currentUserId);
    }

    @Override
    public Crop getCropById(Integer cropId) {

        if (securityUtils.isAdmin()) {

            return cropRepository.findById(cropId)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Crop not found"
                            ));
        }

        Integer currentUserId =
                securityUtils.getAuthenticatedUserId();

        return cropRepository.findByCropIdAndUserId(
                        cropId,
                        currentUserId
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Crop not found or access denied"
                        ));
    }

    @Override
    public String updateCrop(
            Integer cropId,
            CropRequest request) {

        Crop crop;

        Integer currentUserId =
                securityUtils.getAuthenticatedUserId();

        if (securityUtils.isAdmin()) {

            crop = cropRepository.findById(cropId)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Crop not found"
                            ));

        } else {

            crop = cropRepository.findByCropIdAndUserId(
                            cropId,
                            currentUserId
                    )
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Crop not found or access denied"
                            ));

            farmRepository.findByFarmIdAndUserId(
                    request.getFarmId(),
                    currentUserId
            ).orElseThrow(() ->
                    new RuntimeException(
                            "Target farm not found or access denied"
                    ));
        }

        crop.setFarmId(request.getFarmId());
        crop.setCropName(request.getCropName());
        crop.setSeason(request.getSeason());
        crop.setSowingDate(request.getSowingDate());
        crop.setHarvestingDate(request.getHarvestingDate());
        crop.setStatus(request.getStatus());

        cropRepository.save(crop);

        // For admin, use the crop's farm owner
        // For farmer, use the currently logged-in user
        User user;

        if (securityUtils.isAdmin()) {

            // Find the farm and get its owner
            user = farmRepository.findById(crop.getFarmId())
                    .map(farm -> userRepository.findById(farm.getUserId())
                            .orElse(null))
                    .orElse(null);

        } else {

            user = userRepository.findById(currentUserId)
                    .orElse(null);
        }

        // Send email notification
        if (user != null &&
                user.getEmail() != null &&
                !user.getEmail().isBlank()) {

            notificationService.sendCropNotification(
                    user.getEmail(),
                    "Your crop \"" +
                            crop.getCropName() +
                            "\" was updated successfully."
            );
        }

        return "Crop updated successfully";
    }

    @Override
    public String deleteCrop(Integer cropId) {

        Crop crop;

        Integer currentUserId =
                securityUtils.getAuthenticatedUserId();

        if (securityUtils.isAdmin()) {

            crop = cropRepository.findById(cropId)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Crop not found"
                            ));

        } else {

            crop = cropRepository.findByCropIdAndUserId(
                            cropId,
                            currentUserId
                    )
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Crop not found or access denied"
                            ));
        }

        // Save crop name BEFORE deletion
        String cropName = crop.getCropName();

        // Get user email BEFORE deletion
        User user;

        if (securityUtils.isAdmin()) {

            user = farmRepository.findById(crop.getFarmId())
                    .map(farm -> userRepository.findById(farm.getUserId())
                            .orElse(null))
                    .orElse(null);

        } else {

            user = userRepository.findById(currentUserId)
                    .orElse(null);
        }

        String userEmail = null;

        if (user != null &&
                user.getEmail() != null &&
                !user.getEmail().isBlank()) {

            userEmail = user.getEmail();
        }

        // Delete crop
        cropRepository.delete(crop);

        // Send email after successful deletion
        if (userEmail != null) {

            notificationService.sendCropNotification(
                    userEmail,
                    "Your crop \"" +
                            cropName +
                            "\" was deleted successfully."
            );
        }

        return "Crop deleted successfully";
    }
}