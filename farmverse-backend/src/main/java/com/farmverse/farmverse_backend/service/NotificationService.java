package com.farmverse.farmverse_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private EmailService emailService;

    public void sendNotification(
            String email,
            String subject,
            String message) {

        emailService.sendNotificationEmail(
                email,
                subject,
                message
        );
    }

    public void sendFarmNotification(
            String email,
            String message) {

        sendNotification(
                email,
                "FarmVerse Farm Notification",
                message
        );
    }

    public void sendCropNotification(
            String email,
            String message) {

        sendNotification(
                email,
                "FarmVerse Crop Notification",
                message
        );
    }

    public void sendIrrigationNotification(
            String email,
            String message) {

        sendNotification(
                email,
                "FarmVerse Irrigation Notification",
                message
        );
    }
}