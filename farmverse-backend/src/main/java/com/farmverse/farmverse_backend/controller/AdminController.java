package com.farmverse.farmverse_backend.controller;

import com.farmverse.farmverse_backend.dto.AdminStatsResponse;
import com.farmverse.farmverse_backend.entity.*;
import com.farmverse.farmverse_backend.repository.*;
import com.farmverse.farmverse_backend.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private IrrigationRepository irrigationRepository;

    @Autowired
    private FertilizerRepository fertilizerRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private SecurityUtils securityUtils;

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getGlobalStats() {
        long totalUsers = userRepository.count();
        long totalFarms = farmRepository.count();
        long totalCrops = cropRepository.count();
        long totalIrrigation = irrigationRepository.count();
        long totalFertilizers = fertilizerRepository.count();
        long totalReports = reportRepository.count();

        List<User> allUsers = userRepository.findAll();
        allUsers.sort((a, b) -> Integer.compare(b.getUserId(), a.getUserId()));
        List<User> recentUsers = allUsers.stream().limit(5).toList();

        List<Farm> allFarms = farmRepository.findAll();
        allFarms.sort((a, b) -> Integer.compare(b.getFarmId(), a.getFarmId()));
        List<Farm> recentFarms = allFarms.stream().limit(5).toList();

        AdminStatsResponse response = new AdminStatsResponse(
                totalUsers, totalFarms, totalCrops,
                totalIrrigation, totalFertilizers, totalReports,
                recentUsers, recentFarms
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (User u : users) {
            Map<String, Object> map = new HashMap<>();
            map.put("userId", u.getUserId());
            map.put("fullName", u.getFullName());
            map.put("email", u.getEmail());
            map.put("phone", u.getPhone());
            map.put("role", u.getRole());
            map.put("createdAt", u.getCreatedAt());
            result.add(map);
        }

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer userId) {
        User currentUser = securityUtils.getAuthenticatedUser();

        if (currentUser.getUserId().equals(userId)) {
            throw new RuntimeException("Cannot delete your own active admin account!");
        }

        User target = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        userRepository.delete(target);
        return ResponseEntity.ok("User deleted successfully");
    }

    @GetMapping("/farms")
    public ResponseEntity<List<Map<String, Object>>> getAllFarmsWithOwners() {
        List<Farm> farms = farmRepository.findAll();
        Map<Integer, User> userCache = getUserCache();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Farm f : farms) {
            Map<String, Object> map = new HashMap<>();
            map.put("farmId", f.getFarmId());
            map.put("userId", f.getUserId());
            map.put("farmName", f.getFarmName());
            map.put("location", f.getLocation());
            map.put("area", f.getArea());
            map.put("soilType", f.getSoilType());
            map.put("createdAt", f.getCreatedAt());

            User owner = userCache.get(f.getUserId());
            map.put("farmerName", owner != null ? owner.getFullName() : "Unknown Farmer");
            map.put("farmerEmail", owner != null ? owner.getEmail() : "N/A");

            result.add(map);
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/crops")
    public ResponseEntity<List<Map<String, Object>>> getAllCropsWithDetails() {
        List<Crop> crops = cropRepository.findAll();
        Map<Integer, Farm> farmCache = getFarmCache();
        Map<Integer, User> userCache = getUserCache();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Crop c : crops) {
            Map<String, Object> map = new HashMap<>();
            map.put("cropId", c.getCropId());
            map.put("farmId", c.getFarmId());
            map.put("cropName", c.getCropName());
            map.put("season", c.getSeason());
            map.put("sowingDate", c.getSowingDate());
            map.put("harvestingDate", c.getHarvestingDate());
            map.put("status", c.getStatus());

            Farm farm = farmCache.get(c.getFarmId());
            String farmName = farm != null ? farm.getFarmName() : "Unknown Farm";
            User owner = farm != null ? userCache.get(farm.getUserId()) : null;
            String farmerName = owner != null ? owner.getFullName() : "Unknown Farmer";

            map.put("farmName", farmName);
            map.put("farmerName", farmerName);

            result.add(map);
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/irrigation")
    public ResponseEntity<List<Map<String, Object>>> getAllIrrigationWithDetails() {
        List<Irrigation> list = irrigationRepository.findAll();
        Map<Integer, Farm> farmCache = getFarmCache();
        Map<Integer, User> userCache = getUserCache();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Irrigation i : list) {
            Map<String, Object> map = new HashMap<>();
            map.put("irrigationId", i.getIrrigationId());
            map.put("farmId", i.getFarmId());
            map.put("irrigationType", i.getIrrigationType());
            map.put("scheduleDate", i.getScheduleDate());
            map.put("waterQuantity", i.getWaterQuantity());
            map.put("remarks", i.getRemarks());

            Farm farm = farmCache.get(i.getFarmId());
            String farmName = farm != null ? farm.getFarmName() : "Unknown Farm";
            User owner = farm != null ? userCache.get(farm.getUserId()) : null;
            String farmerName = owner != null ? owner.getFullName() : "Unknown Farmer";

            map.put("farmName", farmName);
            map.put("farmerName", farmerName);

            result.add(map);
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/fertilizers")
    public ResponseEntity<List<Map<String, Object>>> getAllFertilizersWithDetails() {
        List<Fertilizer> list = fertilizerRepository.findAll();
        Map<Integer, Farm> farmCache = getFarmCache();
        Map<Integer, User> userCache = getUserCache();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Fertilizer ft : list) {
            Map<String, Object> map = new HashMap<>();
            map.put("fertilizerId", ft.getFertilizerId());
            map.put("farmId", ft.getFarmId());
            map.put("fertilizerName", ft.getFertilizerName());
            map.put("quantity", ft.getQuantity());
            map.put("applicationDate", ft.getApplicationDate());
            map.put("notes", ft.getNotes());

            Farm farm = farmCache.get(ft.getFarmId());
            String farmName = farm != null ? farm.getFarmName() : "Unknown Farm";
            User owner = farm != null ? userCache.get(farm.getUserId()) : null;
            String farmerName = owner != null ? owner.getFullName() : "Unknown Farmer";

            map.put("farmName", farmName);
            map.put("farmerName", farmerName);

            result.add(map);
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/reports")
    public ResponseEntity<List<Map<String, Object>>> getAllReportsWithDetails() {
        List<Report> list = reportRepository.findAll();
        Map<Integer, Farm> farmCache = getFarmCache();
        Map<Integer, User> userCache = getUserCache();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Report r : list) {
            Map<String, Object> map = new HashMap<>();
            map.put("reportId", r.getReportId());
            map.put("farmId", r.getFarmId());
            map.put("reportType", r.getReportType());
            map.put("reportDate", r.getReportDate());
            map.put("description", r.getDescription());

            Farm farm = farmCache.get(r.getFarmId());
            String farmName = farm != null ? farm.getFarmName() : "Unknown Farm";
            User owner = farm != null ? userCache.get(farm.getUserId()) : null;
            String farmerName = owner != null ? owner.getFullName() : "Unknown Farmer";

            map.put("farmName", farmName);
            map.put("farmerName", farmerName);

            result.add(map);
        }

        return ResponseEntity.ok(result);
    }

    private Map<Integer, User> getUserCache() {
        Map<Integer, User> cache = new HashMap<>();
        for (User u : userRepository.findAll()) {
            cache.put(u.getUserId(), u);
        }
        return cache;
    }

    private Map<Integer, Farm> getFarmCache() {
        Map<Integer, Farm> cache = new HashMap<>();
        for (Farm f : farmRepository.findAll()) {
            cache.put(f.getFarmId(), f);
        }
        return cache;
    }
}
