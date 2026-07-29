package com.farmverse.farmverse_backend.repository;

import com.farmverse.farmverse_backend.entity.Irrigation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IrrigationRepository extends JpaRepository<Irrigation, Integer> {
}
