package com.farmverse.farmverse_backend.Market;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class MandiPriceService {

    private final RestClient restClient;

    @Value("${mandi.api.key}")
    private String apiKey;

    @Value("${mandi.api.url}")
    private String apiUrl;

    public MandiPriceService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.build();
    }

    public MandiPriceResponse getPrices(
            String commodity,
            String state,
            String district,
            String market,
            int limit
    ) {

        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString(apiUrl)
                .queryParam("api-key", apiKey)
                .queryParam("format", "json")
                .queryParam("limit", Math.min(limit, 100));

        if (hasText(commodity)) {
            builder.queryParam("filters[commodity]", commodity.trim());
        }

        if (hasText(state)) {
            builder.queryParam("filters[state]", state.trim());
        }

        if (hasText(district)) {
            builder.queryParam("filters[district]", district.trim());
        }

        if (hasText(market)) {
            builder.queryParam("filters[market]", market.trim());
        }

        return restClient.get()
                .uri(builder.build().toUri())
                .retrieve()
                .body(MandiPriceResponse.class);
    }

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }
}