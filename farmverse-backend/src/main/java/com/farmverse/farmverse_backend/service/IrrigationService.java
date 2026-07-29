package com.farmverse.farmverse_backend.service;

import com.farmverse.farmverse_backend.dto.IrrigationRequest;
import com.farmverse.farmverse_backend.entity.Irrigation;

import java.util.List;

public interface IrrigationService {

    String addIrrigation(IrrigationRequest request);

    List<Irrigation> getAllIrrigation();

    Irrigation getIrrigationById(Integer irrigationId);

    String updateIrrigation(Integer irrigationId, IrrigationRequest request);

    String deleteIrrigation(Integer irrigationId);
}
