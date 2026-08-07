package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.IrrigationRequest;
import com.farmverse.farmverse_backend.entity.Irrigation;
import com.farmverse.farmverse_backend.repository.FarmRepository;
import com.farmverse.farmverse_backend.repository.IrrigationRepository;
import com.farmverse.farmverse_backend.security.SecurityUtils;
import com.farmverse.farmverse_backend.service.IrrigationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IrrigationServiceImpl implements IrrigationService {

    @Autowired
    private IrrigationRepository irrigationRepository;

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private SecurityUtils securityUtils;

    @Override
    public String addIrrigation(IrrigationRequest request) {
        if (!securityUtils.isAdmin()) {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            farmRepository.findByFarmIdAndUserId(request.getFarmId(), currentUserId)
                    .orElseThrow(() -> new RuntimeException("Target farm not found or access denied"));
        }

        Irrigation irrigation = new Irrigation();
        irrigation.setFarmId(request.getFarmId());
        irrigation.setIrrigationType(request.getIrrigationType());
        irrigation.setScheduleDate(request.getScheduleDate());
        irrigation.setWaterQuantity(request.getWaterQuantity());
        irrigation.setRemarks(request.getRemarks());

        irrigationRepository.save(irrigation);

        return "Irrigation added successfully";
    }

    @Override
    public List<Irrigation> getAllIrrigation() {
        if (securityUtils.isAdmin()) {
            return irrigationRepository.findAll();
        }
        Integer currentUserId = securityUtils.getAuthenticatedUserId();
        return irrigationRepository.findByUserId(currentUserId);
    }

    @Override
    public Irrigation getIrrigationById(Integer irrigationId) {
        if (securityUtils.isAdmin()) {
            return irrigationRepository.findById(irrigationId)
                    .orElseThrow(() -> new RuntimeException("Irrigation record not found"));
        }
        Integer currentUserId = securityUtils.getAuthenticatedUserId();
        return irrigationRepository.findByIrrigationIdAndUserId(irrigationId, currentUserId)
                .orElseThrow(() -> new RuntimeException("Irrigation record not found or access denied"));
    }

    @Override
    public String updateIrrigation(Integer irrigationId, IrrigationRequest request) {
        Irrigation irrigation;
        if (securityUtils.isAdmin()) {
            irrigation = irrigationRepository.findById(irrigationId)
                    .orElseThrow(() -> new RuntimeException("Irrigation record not found"));
        } else {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            irrigation = irrigationRepository.findByIrrigationIdAndUserId(irrigationId, currentUserId)
                    .orElseThrow(() -> new RuntimeException("Irrigation record not found or access denied"));
            farmRepository.findByFarmIdAndUserId(request.getFarmId(), currentUserId)
                    .orElseThrow(() -> new RuntimeException("Target farm not found or access denied"));
        }

        irrigation.setFarmId(request.getFarmId());
        irrigation.setIrrigationType(request.getIrrigationType());
        irrigation.setScheduleDate(request.getScheduleDate());
        irrigation.setWaterQuantity(request.getWaterQuantity());
        irrigation.setRemarks(request.getRemarks());

        irrigationRepository.save(irrigation);

        return "Irrigation updated successfully";
    }

    @Override
    public String deleteIrrigation(Integer irrigationId) {
        Irrigation irrigation;
        if (securityUtils.isAdmin()) {
            irrigation = irrigationRepository.findById(irrigationId)
                    .orElseThrow(() -> new RuntimeException("Irrigation record not found"));
        } else {
            Integer currentUserId = securityUtils.getAuthenticatedUserId();
            irrigation = irrigationRepository.findByIrrigationIdAndUserId(irrigationId, currentUserId)
                    .orElseThrow(() -> new RuntimeException("Irrigation record not found or access denied"));
        }

        irrigationRepository.delete(irrigation);

        return "Irrigation deleted successfully";
    }
}
