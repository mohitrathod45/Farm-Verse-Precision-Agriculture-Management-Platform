package com.farmverse.farmverse_backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "fertilizers")
public class Fertilizer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fertilizer_id")
    private Integer fertilizerId;

    @Column(name = "farm_id", nullable = false)
    private Integer farmId;

    @Column(name = "fertilizer_name")
    private String fertilizerName;

    @Column
    private BigDecimal quantity;

    @Column(name = "application_date")
    private LocalDate applicationDate;

    @Column
    private String notes;

    public Fertilizer() {
    }

    public Integer getFertilizerId() {
        return fertilizerId;
    }

    public void setFertilizerId(Integer fertilizerId) {
        this.fertilizerId = fertilizerId;
    }

    public Integer getFarmId() {
        return farmId;
    }

    public void setFarmId(Integer farmId) {
        this.farmId = farmId;
    }

    public String getFertilizerName() {
        return fertilizerName;
    }

    public void setFertilizerName(String fertilizerName) {
        this.fertilizerName = fertilizerName;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public LocalDate getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(LocalDate applicationDate) {
        this.applicationDate = applicationDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
