package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.FertilizerRequest;
import com.farmverse.farmverse_backend.entity.Fertilizer;
import com.farmverse.farmverse_backend.repository.FertilizerRepository;
import com.farmverse.farmverse_backend.service.FertilizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FertilizerServiceImpl implements FertilizerService {

    @Autowired
    private FertilizerRepository fertilizerRepository;

    @Override
    public String addFertilizer(FertilizerRequest request) {

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
        return fertilizerRepository.findAll();
    }

    @Override
    public Fertilizer getFertilizerById(Integer fertilizerId) {

        return fertilizerRepository.findById(fertilizerId)
                .orElseThrow(() -> new RuntimeException("Fertilizer not found"));
    }

    @Override
    public String updateFertilizer(Integer fertilizerId, FertilizerRequest request) {

        Fertilizer fertilizer = fertilizerRepository.findById(fertilizerId)
                .orElseThrow(() -> new RuntimeException("Fertilizer not found"));

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

        Fertilizer fertilizer = fertilizerRepository.findById(fertilizerId)
                .orElseThrow(() -> new RuntimeException("Fertilizer not found"));

        fertilizerRepository.delete(fertilizer);

        return "Fertilizer deleted successfully";
    }
}
