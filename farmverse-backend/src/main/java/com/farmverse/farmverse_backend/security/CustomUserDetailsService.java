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

        if (email == null || email.isBlank()) {
            throw new UsernameNotFoundException("Email cannot be empty");
        }

        String cleanEmail = email.trim();

        User user = userRepository.findByEmail(cleanEmail)
                .orElseGet(() -> userRepository.findByEmail(cleanEmail.toLowerCase())
                        .orElseThrow(() -> new UsernameNotFoundException("User not found: " + cleanEmail)));

        String roleName = (user.getRole() != null && !user.getRole().isBlank()) ? user.getRole().trim() : "Farmer";

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(roleName)
                .build();
    }
}