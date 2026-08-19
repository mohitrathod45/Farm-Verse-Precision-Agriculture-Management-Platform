package com.farmverse.farmverse_backend.Market;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record MandiPriceResponse(
        @JsonProperty("total") Integer total,
        @JsonProperty("count") Integer count,
        @JsonProperty("records") List<MandiPrice> records
) {

    public record MandiPrice(
            String state,
            String district,
            String market,
            String commodity,
            String variety,

            @JsonProperty("arrival_date")
            String arrivalDate,

            @JsonProperty("min_price")
            String minPrice,

            @JsonProperty("max_price")
            String maxPrice,

            @JsonProperty("modal_price")
            String modalPrice
    ) {}
}