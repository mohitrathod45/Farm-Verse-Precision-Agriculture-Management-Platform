package com.farmverse.farmverse_backend.controller;

import com.farmverse.farmverse_backend.dto.FertilizerRequest;
import com.farmverse.farmverse_backend.entity.Fertilizer;
import com.farmverse.farmverse_backend.service.FertilizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fertilizers")
public class FertilizerController {

    @Autowired
    private FertilizerService fertilizerService;

    @PostMapping("/addfertilizer")
    public ResponseEntity<String> addFertilizer(@RequestBody FertilizerRequest request) {
        return ResponseEntity.ok(fertilizerService.addFertilizer(request));
    }

    @GetMapping("/getallfertilizers")
    public ResponseEntity<List<Fertilizer>> getAllFertilizers() {
        return ResponseEntity.ok(fertilizerService.getAllFertilizers());
    }

    @GetMapping("/{fertilizerId}")
    public ResponseEntity<Fertilizer> getFertilizerById(@PathVariable Integer fertilizerId) {
        return ResponseEntity.ok(fertilizerService.getFertilizerById(fertilizerId));
    }

    @PutMapping("/updatefertilizer/{fertilizerId}")
    public ResponseEntity<String> updateFertilizer(@PathVariable Integer fertilizerId,
                                                   @RequestBody FertilizerRequest request) {
        return ResponseEntity.ok(fertilizerService.updateFertilizer(fertilizerId, request));
    }

    @DeleteMapping("/deletefertilizer/{fertilizerId}")
    public ResponseEntity<String> deleteFertilizer(@PathVariable Integer fertilizerId) {
        return ResponseEntity.ok(fertilizerService.deleteFertilizer(fertilizerId));
    }
}
