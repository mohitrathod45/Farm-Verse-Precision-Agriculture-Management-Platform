package com.farmverse.farmverse_backend.dto;

public class CropRecommendationRequest {

    private double N;
    private double P;
    private double K;
    private double temperature;
    private double humidity;
    private double ph;
    private double rainfall;

    public double getN() {
        return N;
    }

    public void setN(double N) {
        this.N = N;
    }

    public double getP() {
        return P;
    }

    public void setP(double P) {
        this.P = P;
    }

    public double getK() {
        return K;
    }

    public void setK(double K) {
        this.K = K;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getHumidity() {
        return humidity;
    }

    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }

    public double getPh() {
        return ph;
    }

    public void setPh(double ph) {
        this.ph = ph;
    }

    public double getRainfall() {
        return rainfall;
    }

    public void setRainfall(double rainfall) {
        this.rainfall = rainfall;
    }
}