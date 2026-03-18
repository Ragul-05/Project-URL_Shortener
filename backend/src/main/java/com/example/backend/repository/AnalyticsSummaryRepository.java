package com.example.backend.repository;

import com.example.backend.entity.AnalyticsSummary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnalyticsSummaryRepository extends JpaRepository<AnalyticsSummary, Long> {

    Optional<AnalyticsSummary> findByUrl_Id(Long urlId);
}
