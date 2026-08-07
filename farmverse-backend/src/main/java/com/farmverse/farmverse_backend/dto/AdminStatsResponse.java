package com.farmverse.farmverse_backend.dto;

import com.farmverse.farmverse_backend.entity.Farm;
import com.farmverse.farmverse_backend.entity.User;
import java.util.List;

public class AdminStatsResponse {

    private long totalUsers;
    private long totalFarms;
    private long totalCrops;
    private long totalIrrigation;
    private long totalFertilizers;
    private long totalReports;
    private List<User> recentUsers;
    private List<Farm> recentFarms;

    public AdminStatsResponse() {
    }

    public AdminStatsResponse(long totalUsers, long totalFarms, long totalCrops,
                              long totalIrrigation, long totalFertilizers, long totalReports,
                              List<User> recentUsers, List<Farm> recentFarms) {
        this.totalUsers = totalUsers;
        this.totalFarms = totalFarms;
        this.totalCrops = totalCrops;
        this.totalIrrigation = totalIrrigation;
        this.totalFertilizers = totalFertilizers;
        this.totalReports = totalReports;
        this.recentUsers = recentUsers;
        this.recentFarms = recentFarms;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalFarms() {
        return totalFarms;
    }

    public void setTotalFarms(long totalFarms) {
        this.totalFarms = totalFarms;
    }

    public long getTotalCrops() {
        return totalCrops;
    }

    public void setTotalCrops(long totalCrops) {
        this.totalCrops = totalCrops;
    }

    public long getTotalIrrigation() {
        return totalIrrigation;
    }

    public void setTotalIrrigation(long totalIrrigation) {
        this.totalIrrigation = totalIrrigation;
    }

    public long getTotalFertilizers() {
        return totalFertilizers;
    }

    public void setTotalFertilizers(long totalFertilizers) {
        this.totalFertilizers = totalFertilizers;
    }

    public long getTotalReports() {
        return totalReports;
    }

    public void setTotalReports(long totalReports) {
        this.totalReports = totalReports;
    }

    public List<User> getRecentUsers() {
        return recentUsers;
    }

    public void setRecentUsers(List<User> recentUsers) {
        this.recentUsers = recentUsers;
    }

    public List<Farm> getRecentFarms() {
        return recentFarms;
    }

    public void setRecentFarms(List<Farm> recentFarms) {
        this.recentFarms = recentFarms;
    }
}
