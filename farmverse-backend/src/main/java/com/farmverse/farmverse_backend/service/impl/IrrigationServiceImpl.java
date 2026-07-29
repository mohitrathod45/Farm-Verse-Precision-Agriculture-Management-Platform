package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.IrrigationRequest;
import com.farmverse.farmverse_backend.entity.Irrigation;
import com.farmverse.farmverse_backend.repository.IrrigationRepository;
import com.farmverse.farmverse_backend.service.IrrigationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IrrigationServiceImpl implements IrrigationService {

    @Autowired
    private IrrigationRepository irrigationRepository;

    @Override
    public String addIrrigation(IrrigationRequest request) {

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
        return irrigationRepository.findAll();
    }

    @Override
    public Irrigation getIrrigationById(Integer irrigationId) {

        return irrigationRepository.findById(irrigationId)
                .orElseThrow(() -> new RuntimeException("Irrigation not found"));
    }

    @Override
    public String updateIrrigation(Integer irrigationId, IrrigationRequest request) {

        Irrigation irrigation = irrigationRepository.findById(irrigationId)
                .orElseThrow(() -> new RuntimeException("Irrigation not found"));

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

        Irrigation irrigation = irrigationRepository.findById(irrigationId)
                .orElseThrow(() -> new RuntimeException("Irrigation not found"));

        irrigationRepository.delete(irrigation);

        return "Irrigation deleted successfully";
    }
}
