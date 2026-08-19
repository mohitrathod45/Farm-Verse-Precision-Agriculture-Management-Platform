package com.farmverse.farmverse_backend.Market;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mandi")
@CrossOrigin(origins = "http://localhost:5173")
public class MandiPriceController {

    private final MandiPriceService mandiPriceService;

    public MandiPriceController(MandiPriceService mandiPriceService) {
        this.mandiPriceService = mandiPriceService;
    }

    @GetMapping("/prices")
    public ResponseEntity<MandiPriceResponse> getPrices(
            @RequestParam(required = false) String commodity,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String market,
            @RequestParam(defaultValue = "50") int limit
    ) {

        MandiPriceResponse response =
                mandiPriceService.getPrices(
                        commodity,
                        state,
                        district,
                        market,
                        limit
                );

        return ResponseEntity.ok(response);
    }
}