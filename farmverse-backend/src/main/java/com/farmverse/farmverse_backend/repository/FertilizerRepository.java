package com.farmverse.farmverse_backend.repository;

import com.farmverse.farmverse_backend.entity.Fertilizer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FertilizerRepository extends JpaRepository<Fertilizer, Integer> {

    List<Fertilizer> findByFarmId(Integer farmId);

    boolean existsByFarmId(Integer farmId);

    @Query("SELECT ft FROM Fertilizer ft WHERE ft.farmId IN (SELECT f.farmId FROM Farm f WHERE f.userId = :userId)")
    List<Fertilizer> findByUserId(@Param("userId") Integer userId);

    @Query("SELECT ft FROM Fertilizer ft WHERE ft.fertilizerId = :fertilizerId AND ft.farmId IN (SELECT f.farmId FROM Farm f WHERE f.userId = :userId)")
    Optional<Fertilizer> findByFertilizerIdAndUserId(@Param("fertilizerId") Integer fertilizerId, @Param("userId") Integer userId);
}
