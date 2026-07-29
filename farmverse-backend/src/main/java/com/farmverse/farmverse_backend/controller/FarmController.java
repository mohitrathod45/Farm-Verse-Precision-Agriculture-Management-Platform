package com.farmverse.farmverse_backend.controller;

import com.farmverse.farmverse_backend.dto.FarmRequest;
import com.farmverse.farmverse_backend.entity.Farm;
import com.farmverse.farmverse_backend.service.FarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farms")
@CrossOrigin(origins = "*")
public class FarmController {

    @Autowired
    private FarmService farmService;

    @PostMapping("/addfarms")
    public ResponseEntity<String> addFarm(@RequestBody FarmRequest request) {
        return ResponseEntity.ok(farmService.addFarm(request));
    }

    @GetMapping("/getallfarms")
    public ResponseEntity<List<Farm>> getAllFarms() {
        return ResponseEntity.ok(farmService.getAllFarms());
    }

    @GetMapping("/{farmId}")
    public ResponseEntity<Farm> getFarmById(@PathVariable Integer farmId) {
        return ResponseEntity.ok(farmService.getFarmById(farmId));
    }

    @PutMapping("/updatefarm/{farmId}")
    public ResponseEntity<String> updateFarm(@PathVariable Integer farmId,
                                             @RequestBody FarmRequest request) {
        return ResponseEntity.ok(farmService.updateFarm(farmId, request));
    }

    @DeleteMapping("/deletefarm/{farmId}")
    public ResponseEntity<String> deleteFarm(@PathVariable Integer farmId) {
        return ResponseEntity.ok(farmService.deleteFarm(farmId));
    }
}
