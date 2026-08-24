package com.farmverse.farmverse_backend.dto;

public class ProfitEstimationResponse {

    private String crop;
    private double revenue;
    private double totalCost;
    private double profit;
    private double profitPercentage;

    public ProfitEstimationResponse() {
    }

    public ProfitEstimationResponse(
            String crop,
            double revenue,
            double totalCost,
            double profit,
            double profitPercentage) {

        this.crop = crop;
        this.revenue = revenue;
        this.totalCost = totalCost;
        this.profit = profit;
        this.profitPercentage = profitPercentage;
    }

    public String getCrop() {
        return crop;
    }

    public void setCrop(String crop) {
        this.crop = crop;
    }

    public double getRevenue() {
        return revenue;
    }

    public void setRevenue(double revenue) {
        this.revenue = revenue;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    public double getProfit() {
        return profit;
    }

    public void setProfit(double profit) {
        this.profit = profit;
    }

    public double getProfitPercentage() {
        return profitPercentage;
    }

    public void setProfitPercentage(double profitPercentage) {
        this.profitPercentage = profitPercentage;
    }
}