package com.farmverse.farmverse_backend.repository;

import com.farmverse.farmverse_backend.entity.Fertilizer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FertilizerRepository extends JpaRepository<Fertilizer, Integer> {
}
