package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.ChangePasswordRequest;
import com.farmverse.farmverse_backend.dto.ProfileResponse;
import com.farmverse.farmverse_backend.dto.ProfileUpdateRequest;
import com.farmverse.farmverse_backend.entity.User;
import com.farmverse.farmverse_backend.repository.UserRepository;
import com.farmverse.farmverse_backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ProfileResponse getProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToResponse(user);
    }

    @Override
    public ProfileResponse updateProfile(String email, ProfileUpdateRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getFullName() != null && !request.getFullName().isBlank()) {
            user.setFullName(request.getFullName());
        }

        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }

        userRepository.save(user);

        return mapToResponse(user);
    }

    @Override
    public String changePassword(String email, ChangePasswordRequest request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean currentMatches = passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())
                || request.getCurrentPassword().equals(user.getPassword());

        if (!currentMatches) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return "Password changed successfully";
    }

    private ProfileResponse mapToResponse(User user) {
        ProfileResponse response = new ProfileResponse();
        response.setUserId(user.getUserId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setRole(user.getRole());
        response.setCreatedAt(user.getCreatedAt());
        return response;
    }
}