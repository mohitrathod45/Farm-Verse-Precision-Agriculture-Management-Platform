package com.farmverse.farmverse_backend.dto;

import java.time.LocalDate;

public class CropRequest {

    private Integer farmId;
    private String cropName;
    private String season;
    private LocalDate sowingDate;
    private LocalDate harvestingDate;
    private String status;

    public CropRequest() {
    }

    public Integer getFarmId() {
        return farmId;
    }

    public void setFarmId(Integer farmId) {
        this.farmId = farmId;
    }

    public String getCropName() {
        return cropName;
    }

    public void setCropName(String cropName) {
        this.cropName = cropName;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public LocalDate getSowingDate() {
        return sowingDate;
    }

    public void setSowingDate(LocalDate sowingDate) {
        this.sowingDate = sowingDate;
    }

    public LocalDate getHarvestingDate() {
        return harvestingDate;
    }

    public void setHarvestingDate(LocalDate harvestingDate) {
        this.harvestingDate = harvestingDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
