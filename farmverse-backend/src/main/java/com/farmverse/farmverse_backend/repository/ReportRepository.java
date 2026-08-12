package com.farmverse.farmverse_backend.repository;

import com.farmverse.farmverse_backend.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    List<Report> findByFarmId(Integer farmId);

    boolean existsByFarmId(Integer farmId);

    @Query("SELECT r FROM Report r WHERE r.farmId IN (SELECT f.farmId FROM Farm f WHERE f.userId = :userId)")
    List<Report> findByUserId(@Param("userId") Integer userId);

    @Query("SELECT r FROM Report r WHERE r.reportId = :reportId AND r.farmId IN (SELECT f.farmId FROM Farm f WHERE f.userId = :userId)")
    Optional<Report> findByReportIdAndUserId(@Param("reportId") Integer reportId, @Param("userId") Integer userId);
}
