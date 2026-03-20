package com.example.backend.dto;

public record AuthResponse(
        String token,
        String tokenType,
        Long userId,
        String email,
        String name
) {
}
