package com.farmverse.farmverse_backend.repository;

import com.farmverse.farmverse_backend.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, Integer> {

    List<Crop> findByFarmId(Integer farmId);
}
