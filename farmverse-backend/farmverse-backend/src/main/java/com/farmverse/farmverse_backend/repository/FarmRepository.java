package com.farmverse.farmverse_backend.repository;

import com.farmverse.farmverse_backend.entity.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FarmRepository extends JpaRepository<Farm, Integer> {

}