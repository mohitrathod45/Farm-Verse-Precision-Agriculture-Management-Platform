package com.farmverse.farmverse_backend.controller;

import com.farmverse.farmverse_backend.dto.ProfileResponse;
import com.farmverse.farmverse_backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins="*")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public ProfileResponse getProfile(Authentication authentication){
        System.out.println("Login in user: "+authentication.getName());

        return profileService.getProfile(authentication.getName());

    }

}