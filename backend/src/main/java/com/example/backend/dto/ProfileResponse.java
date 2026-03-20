package com.example.backend.dto;

import java.time.LocalDateTime;

public record ProfileResponse(
        Long id,
        String name,
        String email,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
