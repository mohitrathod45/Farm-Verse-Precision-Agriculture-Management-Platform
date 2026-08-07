package com.farmverse.farmverse_backend.repository;

import com.farmverse.farmverse_backend.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CropRepository extends JpaRepository<Crop, Integer> {

    List<Crop> findByFarmId(Integer farmId);

    @Query("SELECT c FROM Crop c WHERE c.farmId IN (SELECT f.farmId FROM Farm f WHERE f.userId = :userId)")
    List<Crop> findByUserId(@Param("userId") Integer userId);

    @Query("SELECT c FROM Crop c WHERE c.cropId = :cropId AND c.farmId IN (SELECT f.farmId FROM Farm f WHERE f.userId = :userId)")
    Optional<Crop> findByCropIdAndUserId(@Param("cropId") Integer cropId, @Param("userId") Integer userId);
}
