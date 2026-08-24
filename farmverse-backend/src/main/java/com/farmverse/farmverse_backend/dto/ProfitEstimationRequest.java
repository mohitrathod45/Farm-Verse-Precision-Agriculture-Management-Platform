package com.farmverse.farmverse_backend.dto;

public class ProfitEstimationRequest {

    private String crop;
    private double landArea;
    private double sellingPrice;
    private double seedCost;
    private double fertilizerCost;
    private double laborCost;
    private double irrigationCost;

    public ProfitEstimationRequest() {
    }

    public String getCrop() {
        return crop;
    }

    public void setCrop(String crop) {
        this.crop = crop;
    }

    public double getLandArea() {
        return landArea;
    }

    public void setLandArea(double landArea) {
        this.landArea = landArea;
    }

    public double getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(double sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public double getSeedCost() {
        return seedCost;
    }

    public void setSeedCost(double seedCost) {
        this.seedCost = seedCost;
    }

    public double getFertilizerCost() {
        return fertilizerCost;
    }

    public void setFertilizerCost(double fertilizerCost) {
        this.fertilizerCost = fertilizerCost;
    }

    public double getLaborCost() {
        return laborCost;
    }

    public void setLaborCost(double laborCost) {
        this.laborCost = laborCost;
    }

    public double getIrrigationCost() {
        return irrigationCost;
    }

    public void setIrrigationCost(double irrigationCost) {
        this.irrigationCost = irrigationCost;
    }
}