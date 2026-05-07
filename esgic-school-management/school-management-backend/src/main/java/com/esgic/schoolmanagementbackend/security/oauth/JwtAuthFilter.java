package com.esgic.schoolmanagementbackend.security.oauth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    public JwtAuthFilter(UserDetailsService userDetailsService, JwtService jwtService) {
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
        try {
            String authHeader = request.getHeader("Authorization");
            String token = null;
            String userId = null;
            boolean isTokenExpired = true;

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
                //log.info("======== JwtAuthFilter {}", token);
                isTokenExpired = jwtService.isTokenExpired(token);
                userId = jwtService.extractUsername(token);
            }

            if (!isTokenExpired && userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(userId);
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }


            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.info(e.getMessage(), e);
            try {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Autorisation non accordée");
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        }
    }
}
