package com.farmverse.farmverse_backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "farms")
public class Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "farm_id")
    private Integer farmId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "farm_name", nullable = false)
    private String farmName;

    @Column
    private String location;

    @Column
    private BigDecimal area;

    @Column(name = "soil_type")
    private String soilType;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public Farm() {
    }

    public Integer getFarmId() {
        return farmId;
    }

    public void setFarmId(Integer farmId) {
        this.farmId = farmId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getFarmName() {
        return farmName;
    }

    public void setFarmName(String farmName) {
        this.farmName = farmName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public BigDecimal getArea() {
        return area;
    }

    public void setArea(BigDecimal area) {
        this.area = area;
    }

    public String getSoilType() {
        return soilType;
    }

    public void setSoilType(String soilType) {
        this.soilType = soilType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
