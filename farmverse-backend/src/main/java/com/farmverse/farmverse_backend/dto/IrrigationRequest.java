package com.farmverse.farmverse_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class IrrigationRequest {

    private Integer farmId;
    private String irrigationType;
    private LocalDate scheduleDate;
    private BigDecimal waterQuantity;
    private String remarks;

    public IrrigationRequest() {
    }

    public Integer getFarmId() {
        return farmId;
    }

    public void setFarmId(Integer farmId) {
        this.farmId = farmId;
    }

    public String getIrrigationType() {
        return irrigationType;
    }

    public void setIrrigationType(String irrigationType) {
        this.irrigationType = irrigationType;
    }

    public LocalDate getScheduleDate() {
        return scheduleDate;
    }

    public void setScheduleDate(LocalDate scheduleDate) {
        this.scheduleDate = scheduleDate;
    }

    public BigDecimal getWaterQuantity() {
        return waterQuantity;
    }

    public void setWaterQuantity(BigDecimal waterQuantity) {
        this.waterQuantity = waterQuantity;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
