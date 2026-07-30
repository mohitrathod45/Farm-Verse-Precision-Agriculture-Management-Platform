package com.farmverse.farmverse_backend.controller;

import com.farmverse.farmverse_backend.dto.IrrigationRequest;
import com.farmverse.farmverse_backend.entity.Irrigation;
import com.farmverse.farmverse_backend.service.IrrigationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/irrigation")
public class IrrigationController {

    @Autowired
    private IrrigationService irrigationService;

    @PostMapping("/addirrigation")
    public ResponseEntity<String> addIrrigation(@RequestBody IrrigationRequest request) {
        return ResponseEntity.ok(irrigationService.addIrrigation(request));
    }

    @GetMapping("/getallirrigation")
    public ResponseEntity<List<Irrigation>> getAllIrrigation() {
        return ResponseEntity.ok(irrigationService.getAllIrrigation());
    }

    @GetMapping("/{irrigationId}")
    public ResponseEntity<Irrigation> getIrrigationById(@PathVariable Integer irrigationId) {
        return ResponseEntity.ok(irrigationService.getIrrigationById(irrigationId));
    }

    @PutMapping("/updateirrigation/{irrigationId}")
    public ResponseEntity<String> updateIrrigation(@PathVariable Integer irrigationId,
                                                   @RequestBody IrrigationRequest request) {
        return ResponseEntity.ok(irrigationService.updateIrrigation(irrigationId, request));
    }

    @DeleteMapping("/deleteirrigation/{irrigationId}")
    public ResponseEntity<String> deleteIrrigation(@PathVariable Integer irrigationId) {
        return ResponseEntity.ok(irrigationService.deleteIrrigation(irrigationId));
    }
}
