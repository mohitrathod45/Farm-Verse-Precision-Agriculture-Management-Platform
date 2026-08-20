package com.farmverse.farmverse_backend.controller;

import com.farmverse.farmverse_backend.dto.LoginRequest;
import com.farmverse.farmverse_backend.dto.LoginResponse;
import com.farmverse.farmverse_backend.dto.RegisterRequest;
import com.farmverse.farmverse_backend.dto.VerifyOtpRequest;
import com.farmverse.farmverse_backend.service.AuthService;
import com.farmverse.farmverse_backend.service.NotificationService;
import com.farmverse.farmverse_backend.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request) {

        return ResponseEntity.ok(
                authService.register(request)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }

    @GetMapping("/test-email")
    public String testEmail() {

        emailService.sendSimpleEmail(
                "farmverse.app@gmail.com",
                "FarmVerse Email Test",
                "This is a test email from FarmVerse."
        );

        return "Email sent successfully!";
    }

    // NEW
    @PostMapping("/test-notification-service")
    public ResponseEntity<String> testNotificationService(
            @RequestParam String email) {

        notificationService.sendFarmNotification(
                email,
                "🌱 This is a test notification from the FarmVerse notification service."
        );

        return ResponseEntity.ok(
                "Notification service test email sent successfully!"
        );
    }
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(
            @RequestBody VerifyOtpRequest request) {

        return ResponseEntity.ok(
                authService.verifyOtp(
                        request.getEmail(),
                        request.getOtp()
                )
        );
    }
}