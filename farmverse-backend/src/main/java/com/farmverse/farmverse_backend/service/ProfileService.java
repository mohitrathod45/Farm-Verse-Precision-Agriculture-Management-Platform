package com.farmverse.farmverse_backend.service;

import com.farmverse.farmverse_backend.dto.ProfileResponse;

public interface ProfileService {

    ProfileResponse getProfile(String email);

}