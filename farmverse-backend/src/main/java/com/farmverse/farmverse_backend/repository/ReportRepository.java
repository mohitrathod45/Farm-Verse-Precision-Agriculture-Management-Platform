package com.farmverse.farmverse_backend.repository;

import com.farmverse.farmverse_backend.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Integer> {
}
