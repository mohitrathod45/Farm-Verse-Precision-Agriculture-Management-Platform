package com.farmverse.farmverse_backend.controller;

import com.farmverse.farmverse_backend.dto.ChangePasswordRequest;
import com.farmverse.farmverse_backend.dto.ProfileResponse;
import com.farmverse.farmverse_backend.dto.ProfileUpdateRequest;
import com.farmverse.farmverse_backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile(Authentication authentication) {
        System.out.println("Fetching profile for: " + authentication.getName());
        ProfileResponse profile = profileService.getProfile(authentication.getName());
        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<ProfileResponse> updateProfile(
            Authentication authentication,
            @RequestBody ProfileUpdateRequest request) {
        System.out.println("Updating profile for: " + authentication.getName());
        ProfileResponse updated = profileService.updateProfile(authentication.getName(), request);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(
            Authentication authentication,
            @RequestBody ChangePasswordRequest request) {
        System.out.println("Changing password for: " + authentication.getName());
        try {
            String message = profileService.changePassword(authentication.getName(), request);
            return ResponseEntity.ok(Map.of("message", message));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}