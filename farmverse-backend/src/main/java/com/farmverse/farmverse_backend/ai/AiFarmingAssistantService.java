package com.farmverse.farmverse_backend.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiFarmingAssistantService {

    private final ChatClient chatClient;

    public AiFarmingAssistantService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String getAdvice(String question) {
        return chatClient
                .prompt()
                .user(question)
                .call()
                .content();
    }
}