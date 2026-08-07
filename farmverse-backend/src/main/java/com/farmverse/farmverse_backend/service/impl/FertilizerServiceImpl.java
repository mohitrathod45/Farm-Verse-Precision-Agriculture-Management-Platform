package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.FertilizerRequest;
import com.farmverse.farmverse_backend.entity.Fertilizer;
import com.farmverse.farmverse_backend.repository.FarmRepository;
import com.farmverse.farmverse_backend.repository.FertilizerRepository;
import com.farmverse.farmverse_backend.security.SecurityUtils;
import com.farmverse.farmverse_backend.service.FertilizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FertilizerServiceImpl implements FertilizerService {

    @Autowired
    private FertilizerRepository fertilizerRepository;

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private SecurityUtils securityUtils;

    @Override
    public String addFertilizer(FertilizerRequest request) {
        if (!securityUtils.isAdmin()) {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            farmRepository.findByFarmIdAndUserId(request.getFarmId(), currentUserId)
                    .orElseThrow(() -> new RuntimeException("Target farm not found or access denied"));
        }

        Fertilizer fertilizer = new Fertilizer();
        fertilizer.setFarmId(request.getFarmId());
        fertilizer.setFertilizerName(request.getFertilizerName());
        fertilizer.setQuantity(request.getQuantity());
        fertilizer.setApplicationDate(request.getApplicationDate());
        fertilizer.setNotes(request.getNotes());

        fertilizerRepository.save(fertilizer);

        return "Fertilizer added successfully";
    }

    @Override
    public List<Fertilizer> getAllFertilizers() {
        if (securityUtils.isAdmin()) {
            return fertilizerRepository.findAll();
        }
        Integer currentUserId = securityUtils.getAuthenticatedUserId();
        return fertilizerRepository.findByUserId(currentUserId);
    }

    @Override
    public Fertilizer getFertilizerById(Integer fertilizerId) {
        if (securityUtils.isAdmin()) {
            return fertilizerRepository.findById(fertilizerId)
                    .orElseThrow(() -> new RuntimeException("Fertilizer record not found"));
        }
        Integer currentUserId = securityUtils.getAuthenticatedUserId();
        return fertilizerRepository.findByFertilizerIdAndUserId(fertilizerId, currentUserId)
                .orElseThrow(() -> new RuntimeException("Fertilizer record not found or access denied"));
    }

    @Override
    public String updateFertilizer(Integer fertilizerId, FertilizerRequest request) {
        Fertilizer fertilizer;
        if (securityUtils.isAdmin()) {
            fertilizer = fertilizerRepository.findById(fertilizerId)
                    .orElseThrow(() -> new RuntimeException("Fertilizer record not found"));
        } else {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            fertilizer = fertilizerRepository.findByFertilizerIdAndUserId(fertilizerId, currentUserId)
                    .orElseThrow(() -> new RuntimeException("Fertilizer record not found or access denied"));
            farmRepository.findByFarmIdAndUserId(request.getFarmId(), currentUserId)
                    .orElseThrow(() -> new RuntimeException("Target farm not found or access denied"));
        }

        fertilizer.setFarmId(request.getFarmId());
        fertilizer.setFertilizerName(request.getFertilizerName());
        fertilizer.setQuantity(request.getQuantity());
        fertilizer.setApplicationDate(request.getApplicationDate());
        fertilizer.setNotes(request.getNotes());

        fertilizerRepository.save(fertilizer);

        return "Fertilizer updated successfully";
    }

    @Override
    public String deleteFertilizer(Integer fertilizerId) {
        Fertilizer fertilizer;
        if (securityUtils.isAdmin()) {
            fertilizer = fertilizerRepository.findById(fertilizerId)
                    .orElseThrow(() -> new RuntimeException("Fertilizer record not found"));
        } else {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            fertilizer = fertilizerRepository.findByFertilizerIdAndUserId(fertilizerId, currentUserId)
                    .orElseThrow(() -> new RuntimeException("Fertilizer record not found or access denied"));
        }

        fertilizerRepository.delete(fertilizer);

        return "Fertilizer deleted successfully";
    }
}
