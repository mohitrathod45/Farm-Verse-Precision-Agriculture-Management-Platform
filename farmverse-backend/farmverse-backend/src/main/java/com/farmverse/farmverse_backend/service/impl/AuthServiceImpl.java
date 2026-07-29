package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.LoginRequest;
import com.farmverse.farmverse_backend.dto.LoginResponse;
import com.farmverse.farmverse_backend.dto.RegisterRequest;
import com.farmverse.farmverse_backend.entity.User;
import com.farmverse.farmverse_backend.repository.UserRepository;
import com.farmverse.farmverse_backend.security.JwtService;
import com.farmverse.farmverse_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Override
    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists!";
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());

        if (request.getRole() == null || request.getRole().isBlank()) {
            user.setRole("Farmer");
        } else {
            user.setRole(request.getRole());
        }

        userRepository.save(user);

        return "Registration Successful";
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean matches = passwordEncoder.matches(request.getPassword(), user.getPassword())
                || request.getPassword().equals(user.getPassword());

        if (!matches) {
            throw new RuntimeException("Invalid Password");
        }

        // Auto-upgrade plain text password to BCrypt hash in DB on login
        if (request.getPassword().equals(user.getPassword())) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            userRepository.save(user);
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(token, "Login Successful", user.getFullName(), user.getRole());
    }
}