package com.farmverse.farmverse_backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("\n--------------------------------------------------");
        System.out.println("[JWT-FILTER TRACE] Request Received: " + request.getMethod() + " " + request.getRequestURI());

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            System.out.println("[JWT-FILTER TRACE] Preflight OPTIONS request - passing through.");
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");
        System.out.println("[JWT-FILTER TRACE] Authorization Header: " + (authHeader != null ? (authHeader.length() > 30 ? authHeader.substring(0, 30) + "..." : authHeader) : "NULL"));

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("[JWT-FILTER TRACE FAIL] Missing or non-Bearer Authorization header!");
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);
        System.out.println("[JWT-FILTER TRACE] Extracted JWT Token (first 20 chars): " + (jwt.length() > 20 ? jwt.substring(0, 20) + "..." : jwt));

        try {
            final String email = jwtService.extractUsername(jwt);
            System.out.println("[JWT-FILTER TRACE] Extracted Username from Token: " + email);

            if (email != null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                System.out.println("[JWT-FILTER TRACE] UserDetails Loaded -> User: " + userDetails.getUsername() + " | Authorities: " + userDetails.getAuthorities());

                boolean isValid = jwtService.isTokenValid(jwt, userDetails.getUsername());
                System.out.println("[JWT-FILTER TRACE] Token Validation Result: " + isValid);

                if (isValid) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities());

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request));

                    System.out.println("[JWT-FILTER TRACE] Authentication object before storing: " + authToken);

                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    System.out.println("[JWT-FILTER TRACE SUCCESS] SecurityContextHolder populated successfully: " + SecurityContextHolder.getContext().getAuthentication());
                } else {
                    System.out.println("[JWT-FILTER TRACE FAIL] Token validation failed!");
                }
            }
        } catch (Exception e) {
            System.out.println("[JWT-FILTER TRACE ERROR] Exception caught in filter: " + e.getClass().getName() + " - " + e.getMessage());
            SecurityContextHolder.clearContext();
        }

        System.out.println("[JWT-FILTER TRACE] Continuing filter chain execution...");
        filterChain.doFilter(request, response);
        System.out.println("[JWT-FILTER TRACE] Response Status Code after filter chain: " + response.getStatus());
        System.out.println("--------------------------------------------------\n");
    }
}