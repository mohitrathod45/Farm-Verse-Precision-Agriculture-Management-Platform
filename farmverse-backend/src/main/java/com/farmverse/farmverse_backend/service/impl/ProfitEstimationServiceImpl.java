package com.farmverse.farmverse_backend.service.impl;

import org.springframework.stereotype.Service;

import com.farmverse.farmverse_backend.dto.ProfitEstimationRequest;
import com.farmverse.farmverse_backend.dto.ProfitEstimationResponse;
import com.farmverse.farmverse_backend.service.ProfitEstimationService;

@Service
public class ProfitEstimationServiceImpl implements ProfitEstimationService {

    @Override
    public ProfitEstimationResponse estimateProfit(
            ProfitEstimationRequest request) {

        double totalCost =
                request.getSeedCost()
                + request.getFertilizerCost()
                + request.getLaborCost()
                + request.getIrrigationCost();

        double revenue =
                request.getLandArea()
                * request.getSellingPrice();

        double profit = revenue - totalCost;

        double profitPercentage = 0.0;

        if (totalCost > 0) {
            profitPercentage = (profit / totalCost) * 100;
        }

        return new ProfitEstimationResponse(
                request.getCrop(),
                revenue,
                totalCost,
                profit,
                profitPercentage
        );
    }
}