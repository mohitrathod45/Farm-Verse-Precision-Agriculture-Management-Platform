package com.farmverse.farmverse_backend.ai;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiFarmingAssistantController {

    private static final Logger log = LoggerFactory.getLogger(AiFarmingAssistantController.class);
    private final AiFarmingAssistantService aiService;

    public AiFarmingAssistantController(AiFarmingAssistantService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/ask")
    public ResponseEntity<String> askFarmingAssistant(@RequestParam(required = false) String question) {
        log.info("Received AI Farming Assistant request. Question: '{}'", question);

        if (question == null || question.trim().isEmpty()) {
            log.warn("Validation failure: question parameter is missing or empty.");
            return ResponseEntity.badRequest().body("Question cannot be empty. Please ask a valid farming question.");
        }

        try {
            String answer = aiService.getAdvice(question.trim());
            return ResponseEntity.ok(answer);
        } catch (IllegalArgumentException ex) {
            log.warn("Validation error in AI Assistant: {}", ex.getMessage());
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            log.error("Unhandled exception during AI Farming Assistant request for question '{}':", question, ex);
            return ResponseEntity.internalServerError()
                    .body("AI Assistant is currently unavailable. Please verify your GOOGLE_API_KEY configuration or try again later.");
        }
    }
}
