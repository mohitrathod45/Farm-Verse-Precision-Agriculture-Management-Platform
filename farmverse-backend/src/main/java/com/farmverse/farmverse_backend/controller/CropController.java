package com.farmverse.farmverse_backend.controller;

import com.farmverse.farmverse_backend.dto.CropRequest;
import com.farmverse.farmverse_backend.entity.Crop;
import com.farmverse.farmverse_backend.service.CropService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
public class CropController {

    @Autowired
    private CropService cropService;

    @PostMapping("/addcrop")
    public ResponseEntity<String> addCrop(@RequestBody CropRequest request) {
        return ResponseEntity.ok(cropService.addCrop(request));
    }

    @GetMapping("/getallcrops")
    public ResponseEntity<List<Crop>> getAllCrops() {
        return ResponseEntity.ok(cropService.getAllCrops());
    }

    @GetMapping("/{cropId}")
    public ResponseEntity<Crop> getCropById(@PathVariable Integer cropId) {
        return ResponseEntity.ok(cropService.getCropById(cropId));
    }

    @PutMapping("/updatecrop/{cropId}")
    public ResponseEntity<String> updateCrop(@PathVariable Integer cropId,
                                             @RequestBody CropRequest request) {
        return ResponseEntity.ok(cropService.updateCrop(cropId, request));
    }

    @DeleteMapping("/deletecrop/{cropId}")
    public ResponseEntity<String> deleteCrop(@PathVariable Integer cropId) {
        return ResponseEntity.ok(cropService.deleteCrop(cropId));
    }
}
