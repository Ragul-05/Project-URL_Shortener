package com.example.backend.repository;

import com.example.backend.entity.UrlClick;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UrlClickRepository extends JpaRepository<UrlClick, Long> {

    long countByUrl_Id(Long urlId);
}
