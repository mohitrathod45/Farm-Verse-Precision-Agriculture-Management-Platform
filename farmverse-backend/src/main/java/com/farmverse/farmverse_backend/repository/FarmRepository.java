package com.farmverse.farmverse_backend.repository;

import com.farmverse.farmverse_backend.entity.Farm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmRepository extends JpaRepository<Farm, Integer> {

    List<Farm> findByUserId(Integer userId);
}
