package com.farmverse.farmverse_backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    private Key getSignKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        try {
            return extractAllClaims(token).getSubject();
        } catch (Exception e) {
            System.out.println("[JWT-SERVICE DEBUG] extractUsername failed: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            throw e;
        }
    }

    public boolean isTokenValid(String token, String email) {
        try {
            String extracted = extractUsername(token);
            boolean usernameMatches = extracted.equalsIgnoreCase(email);
            boolean expired = isTokenExpired(token);

            System.out.println("[JWT-SERVICE DEBUG] Username Extracted from JWT: '" + extracted + "' | UserDetails Email: '" + email + "' | Username Matches: " + usernameMatches);
            System.out.println("[JWT-SERVICE DEBUG] Token Expired Check: " + expired);

            if (!usernameMatches) {
                System.out.println("[JWT-SERVICE DEBUG FAIL] Username Mismatch! JWT subject: '" + extracted + "', Expected: '" + email + "'");
                return false;
            }
            if (expired) {
                System.out.println("[JWT-SERVICE DEBUG FAIL] Token is EXPIRED!");
                return false;
            }

            System.out.println("[JWT-SERVICE DEBUG SUCCESS] Token is VALID!");
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("[JWT-SERVICE DEBUG FAIL] ExpiredJwtException: Token expired at " + e.getClaims().getExpiration());
            return false;
        } catch (SignatureException e) {
            System.out.println("[JWT-SERVICE DEBUG FAIL] SignatureException: Invalid JWT signature!");
            return false;
        } catch (MalformedJwtException e) {
            System.out.println("[JWT-SERVICE DEBUG FAIL] MalformedJwtException: JWT token is malformed!");
            return false;
        } catch (Exception e) {
            System.out.println("[JWT-SERVICE DEBUG FAIL] " + e.getClass().getSimpleName() + ": " + e.getMessage());
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}