package com.farmverse.farmverse_backend.service;

import com.farmverse.farmverse_backend.dto.LoginRequest;
import com.farmverse.farmverse_backend.dto.LoginResponse;
import com.farmverse.farmverse_backend.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

}