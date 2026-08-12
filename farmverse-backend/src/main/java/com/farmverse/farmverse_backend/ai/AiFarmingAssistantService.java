package com.farmverse.farmverse_backend.ai;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiFarmingAssistantService {

    private static final Logger log = LoggerFactory.getLogger(AiFarmingAssistantService.class);
    private final ChatClient chatClient;

    private static final String SYSTEM_PROMPT = """
        You are FarmVerse AI, an expert agricultural assistant and precision farming companion.
        Provide clear, accurate, practical, and encouragement-focused advice to farmers on crops,
        soil health, pest management, irrigation, fertilizers, weather adaptation, and modern farming.
        Keep answers informative, well-structured, and easy for farmers to understand.
        """;

    public AiFarmingAssistantService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String getAdvice(String question) {
        if (question == null || question.trim().isEmpty()) {
            throw new IllegalArgumentException("Question cannot be empty. Please ask a valid farming question.");
        }

        log.info("Sending request to Google GenAI for question: '{}'", question);
        try {
            String response = chatClient
                    .prompt()
                    .system(SYSTEM_PROMPT)
                    .user(question.trim())
                    .call()
                    .content();

            if (response == null || response.trim().isEmpty()) {
                log.warn("Google GenAI returned empty response for question: '{}'", question);
                return "I apologize, but I couldn't generate a response to your query at this moment. Please try rephrasing your question.";
            }

            log.info("Successfully received AI response for question: '{}'", question);
            return response;
        } catch (Exception ex) {
            log.error("Error communicating with Google GenAI API for question '{}':", question, ex);
            throw new RuntimeException("Failed to generate content: " + ex.getMessage(), ex);
        }
    }
}