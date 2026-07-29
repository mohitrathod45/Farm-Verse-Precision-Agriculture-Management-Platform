package com.farmverse.farmverse_backend.service;

import com.farmverse.farmverse_backend.dto.ChangePasswordRequest;
import com.farmverse.farmverse_backend.dto.ProfileResponse;
import com.farmverse.farmverse_backend.dto.ProfileUpdateRequest;

public interface ProfileService {

    ProfileResponse getProfile(String email);

    ProfileResponse updateProfile(String email, ProfileUpdateRequest request);

    String changePassword(String email, ChangePasswordRequest request);
}