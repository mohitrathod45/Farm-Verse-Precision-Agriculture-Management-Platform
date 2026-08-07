package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.LoginRequest;
import com.farmverse.farmverse_backend.dto.LoginResponse;
import com.farmverse.farmverse_backend.dto.RegisterRequest;
import com.farmverse.farmverse_backend.entity.User;
import com.farmverse.farmverse_backend.repository.UserRepository;
import com.farmverse.farmverse_backend.security.JwtService;
import com.farmverse.farmverse_backend.service.AuthService;
import jakarta.annotation.PostConstruct;
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

    @PostConstruct
    public void initAdminUser() {
        try {
            String adminEmail = "admin@farmverse.com";
            if (!userRepository.existsByEmail(adminEmail)) {
                User admin = new User();
                admin.setFullName("System Admin");
                admin.setEmail(adminEmail);
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setPhone("9999999999");
                admin.setRole("Admin");
                userRepository.save(admin);
                System.out.println("[DB SEED] Created default Admin account: admin@farmverse.com / admin123");
            }
        } catch (Exception e) {
            System.err.println("[DB SEED WARNING] Could not seed admin account: " + e.getMessage());
        }
    }

    @Override
    public String register(RegisterRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new RuntimeException("Email is required");
        }

        String cleanEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(cleanEmail)) {
            throw new RuntimeException("Email already registered! Please sign in or use another email.");
        }

        User user = new User();
        user.setFullName(request.getFullName() != null ? request.getFullName().trim() : "");
        user.setEmail(cleanEmail);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone() != null ? request.getPhone().trim() : "");

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
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new RuntimeException("Email is required");
        }

        String cleanEmail = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(cleanEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + cleanEmail));

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