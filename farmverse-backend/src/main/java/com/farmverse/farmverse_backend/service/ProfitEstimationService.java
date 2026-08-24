package com.farmverse.farmverse_backend.service;

import com.farmverse.farmverse_backend.dto.ProfitEstimationRequest;
import com.farmverse.farmverse_backend.dto.ProfitEstimationResponse;

public interface ProfitEstimationService {

    ProfitEstimationResponse estimateProfit(
            ProfitEstimationRequest request
    );
}