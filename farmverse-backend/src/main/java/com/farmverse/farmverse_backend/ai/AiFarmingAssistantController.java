package com.farmverse.farmverse_backend.ai;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin
public class AiFarmingAssistantController {
      private final AiFarmingAssistantService aiService;

    public AiFarmingAssistantController(AiFarmingAssistantService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/ask")
    public String askFarmingAssistant(@RequestParam String question) {
        return aiService.getAdvice(question);
    }
    
}
