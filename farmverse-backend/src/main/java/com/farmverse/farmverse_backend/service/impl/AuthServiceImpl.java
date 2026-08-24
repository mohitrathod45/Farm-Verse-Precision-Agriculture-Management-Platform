package com.farmverse.farmverse_backend.service.impl;

import com.farmverse.farmverse_backend.dto.LoginRequest;
import com.farmverse.farmverse_backend.dto.LoginResponse;
import com.farmverse.farmverse_backend.dto.RegisterRequest;
import com.farmverse.farmverse_backend.entity.User;
import com.farmverse.farmverse_backend.repository.UserRepository;
import com.farmverse.farmverse_backend.security.JwtService;
import com.farmverse.farmverse_backend.service.AuthService;
import com.farmverse.farmverse_backend.service.EmailService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private EmailService emailService;

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

                // Admin account is already verified
                admin.setEmailVerified(true);

                userRepository.save(admin);

                System.out.println(
                        "[DB SEED] Created default Admin account: admin@farmverse.com / admin123"
                );
            }

        } catch (Exception e) {
            System.err.println(
                    "[DB SEED WARNING] Could not seed admin account: "
                            + e.getMessage()
            );
        }
    }

    @Override
    public String register(RegisterRequest request) {

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new RuntimeException("Email is required");
        }

        String cleanEmail = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(cleanEmail)) {
            throw new RuntimeException(
                    "Email already registered! Please sign in or use another email."
            );
        }

        User user = new User();

        user.setFullName(
                request.getFullName() != null
                        ? request.getFullName().trim()
                        : ""
        );

        user.setEmail(cleanEmail);

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setPhone(
                request.getPhone() != null
                        ? request.getPhone().trim()
                        : ""
        );

        if (request.getRole() == null || request.getRole().isBlank()) {
            user.setRole("Farmer");
        } else {
            user.setRole(request.getRole());
        }

        // Generate 6-digit OTP
        String otp = String.format(
                "%06d",
                new Random().nextInt(1_000_000)
        );

        // Save OTP
        user.setVerificationOtp(otp);

        // OTP expires after 5 minutes
        user.setOtpExpiry(
                LocalDateTime.now().plusMinutes(5)
        );

        // New users are NOT verified yet
        user.setEmailVerified(false);

        // Save user before sending email
        userRepository.save(user);

        // Send OTP email
        emailService.sendSimpleEmail(
                cleanEmail,
                "FarmVerse Email Verification OTP",
                "Hello " + user.getFullName() + ",\n\n"
                        + "Your FarmVerse email verification OTP is: "
                        + otp
                        + "\n\n"
                        + "This OTP will expire in 5 minutes.\n\n"
                        + "Please do not share this OTP with anyone.\n\n"
                        + "Regards,\n"
                        + "FarmVerse Team"
        );

        return "Registration successful. OTP sent to your email.";
    }

    @Override
    public String verifyOtp(String email, String otp) {

        if (email == null || email.isBlank()) {
            throw new RuntimeException("Email is required");
        }

        if (otp == null || otp.isBlank()) {
            throw new RuntimeException("OTP is required");
        }

        String cleanEmail = email.trim().toLowerCase();

        User user = userRepository.findByEmail(cleanEmail)
                .orElseThrow(() ->
                        new RuntimeException("User not found with email: " + cleanEmail));

        // Already verified
        if (user.isEmailVerified()) {
            return "Email is already verified";
        }

        // Check OTP
        if (user.getVerificationOtp() == null ||
                !user.getVerificationOtp().equals(otp.trim())) {

            throw new RuntimeException("Invalid OTP");
        }

        // Check expiry
        if (user.getOtpExpiry() == null ||
                user.getOtpExpiry().isBefore(java.time.LocalDateTime.now())) {

            throw new RuntimeException("OTP has expired");
        }

        // Verification successful
        user.setEmailVerified(true);

        // Clear OTP after successful verification
        user.setVerificationOtp(null);
        user.setOtpExpiry(null);

        userRepository.save(user);

        return "Email verified successfully";
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new RuntimeException("Email is required");
        }

        String cleanEmail = request.getEmail().trim().toLowerCase();

        User user = userRepository.findByEmail(cleanEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with email: " + cleanEmail
                        )
                );

        boolean isAdmin = user.getRole() != null && user.getRole().equalsIgnoreCase("Admin");

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                )
                        || request.getPassword().equals(user.getPassword());

        if (!matches) {
            throw new RuntimeException("Invalid Password");
        }

        // Auto-upgrade plain text password to BCrypt hash
        if (request.getPassword().equals(user.getPassword())) {
            user.setPassword(
                    passwordEncoder.encode(request.getPassword())
            );

            userRepository.save(user);
        }

        // Don't allow unverified farmers to login (Admins bypass email verification)
        if (!isAdmin && !user.isEmailVerified()) {
            throw new RuntimeException(
                    "Please verify your email before logging in."
            );
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                "Login Successful",
                user.getFullName(),
                user.getRole()
        );
    }

    @Override
    public String resendOtp(String email) {

        if (email == null || email.isBlank()) {
            throw new RuntimeException("Email is required");
        }

        String cleanEmail = email.trim().toLowerCase();

        User user = userRepository.findByEmail(cleanEmail)
                .orElseThrow(() ->
                        new RuntimeException("User not found with email: " + cleanEmail));

        if (user.isEmailVerified()) {
            return "Email is already verified";
        }

        // Generate 6-digit OTP
        String otp = String.valueOf(
                100000 + new java.util.Random().nextInt(900000)
        );

        // OTP valid for 5 minutes
        java.time.LocalDateTime expiry =
                java.time.LocalDateTime.now().plusMinutes(5);

        user.setVerificationOtp(otp);
        user.setOtpExpiry(expiry);

        userRepository.save(user);

        // Send OTP email
        emailService.sendSimpleEmail(
                user.getEmail(),
                "FarmVerse - New OTP",
                "Your new FarmVerse verification OTP is: " + otp
                        + "\n\nThis OTP is valid for 5 minutes."
        );

        return "OTP resent successfully";
    }
}