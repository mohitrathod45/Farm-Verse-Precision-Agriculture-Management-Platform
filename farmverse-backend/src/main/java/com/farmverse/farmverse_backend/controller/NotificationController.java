package com.farmverse.farmverse_backend.controller;

import com.farmverse.farmverse_backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(
            @RequestParam String email,
            @RequestParam String message) {

        notificationService.sendNotification(
                email,
                "FarmVerse Notification",
                message
        );

        return ResponseEntity.ok(
                "Notification sent successfully!"
        );
    }
}