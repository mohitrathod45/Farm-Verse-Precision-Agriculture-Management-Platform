package com.farmverse.farmverse_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "crops")
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crop_id")
    private Integer cropId;

    @Column(name = "farm_id", nullable = false)
    private Integer farmId;

    @Column(name = "crop_name")
    private String cropName;

    @Column
    private String season;

    @Column(name = "sowing_date")
    private LocalDate sowingDate;

    @Column(name = "harvesting_date")
    private LocalDate harvestingDate;

    @Column
    private String status;

    public Crop() {
    }

    public Integer getCropId() {
        return cropId;
    }

    public void setCropId(Integer cropId) {
        this.cropId = cropId;
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
