package com.farmverse.farmverse_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farmverse.farmverse_backend.dto.ProfitEstimationRequest;
import com.farmverse.farmverse_backend.dto.ProfitEstimationResponse;
import com.farmverse.farmverse_backend.service.ProfitEstimationService;

@RestController
@RequestMapping("/api/profit-estimation")
@CrossOrigin(origins = "*")
public class ProfitEstimationController {

    private final ProfitEstimationService profitEstimationService;

    public ProfitEstimationController(
            ProfitEstimationService profitEstimationService) {

        this.profitEstimationService = profitEstimationService;
    }

    @PostMapping("/estimate")
    public ResponseEntity<ProfitEstimationResponse> estimateProfit(
            @RequestBody ProfitEstimationRequest request) {

        ProfitEstimationResponse response =
                profitEstimationService.estimateProfit(request);

        return ResponseEntity.ok(response);
    }
}