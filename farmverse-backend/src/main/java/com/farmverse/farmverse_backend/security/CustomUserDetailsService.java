package com.farmverse.farmverse_backend.security;

import com.farmverse.farmverse_backend.entity.User;
import com.farmverse.farmverse_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        System.out.println("[USERDETAILS-SERVICE DEBUG] Loading user by email: " + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    System.out.println("[USERDETAILS-SERVICE DEBUG FAIL] User NOT FOUND in database for email: " + email);
                    return new UsernameNotFoundException("User not found: " + email);
                });

        String roleName = (user.getRole() != null && !user.getRole().isBlank()) ? user.getRole() : "Farmer";

        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(roleName)
                .build();

        System.out.println("[USERDETAILS-SERVICE DEBUG SUCCESS] Loaded UserDetails -> Username: " + userDetails.getUsername() + " | Authorities: " + userDetails.getAuthorities());

        return userDetails;
    }
}