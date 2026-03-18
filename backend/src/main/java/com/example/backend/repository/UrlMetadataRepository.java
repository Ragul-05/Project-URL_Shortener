package com.example.backend.repository;

import com.example.backend.entity.UrlMetadata;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UrlMetadataRepository extends JpaRepository<UrlMetadata, Long> {

    Optional<UrlMetadata> findByUrl_Id(Long urlId);

    List<UrlMetadata> findAllByCategoryIgnoreCase(String category);
}
