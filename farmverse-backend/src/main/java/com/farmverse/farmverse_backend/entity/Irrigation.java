package com.farmverse.farmverse_backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "irrigation")
public class Irrigation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "irrigation_id")
    private Integer irrigationId;

    @Column(name = "farm_id", nullable = false)
    private Integer farmId;

    @Column(name = "irrigation_type")
    private String irrigationType;

    @Column(name = "schedule_date")
    private LocalDate scheduleDate;

    @Column(name = "water_quantity")
    private BigDecimal waterQuantity;

    @Column
    private String remarks;

    public Irrigation() {
    }

    public Integer getIrrigationId() {
        return irrigationId;
    }

    public void setIrrigationId(Integer irrigationId) {
        this.irrigationId = irrigationId;
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
