package com.farmverse.farmverse_backend.repository;

import com.farmverse.farmverse_backend.entity.Irrigation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IrrigationRepository extends JpaRepository<Irrigation, Integer> {

    List<Irrigation> findByFarmId(Integer farmId);

    @Query("SELECT i FROM Irrigation i WHERE i.farmId IN (SELECT f.farmId FROM Farm f WHERE f.userId = :userId)")
    List<Irrigation> findByUserId(@Param("userId") Integer userId);

    @Query("SELECT i FROM Irrigation i WHERE i.irrigationId = :irrigationId AND i.farmId IN (SELECT f.farmId FROM Farm f WHERE f.userId = :userId)")
    Optional<Irrigation> findByIrrigationIdAndUserId(@Param("irrigationId") Integer irrigationId, @Param("userId") Integer userId);
}
