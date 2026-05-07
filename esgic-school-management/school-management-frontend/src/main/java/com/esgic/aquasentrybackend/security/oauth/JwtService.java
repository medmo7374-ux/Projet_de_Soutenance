package com.esgic.schoolmanagementbackend.security.oauth;

import com.esgic.schoolmanagementbackend.entities.Utilisateur;
import com.esgic.schoolmanagementbackend.repositories.UtilisateurRepository;
import com.nimbusds.jose.jwk.source.ImmutableSecret;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@Configuration
public class JwtService {

    private final UtilisateurRepository utilisateurRepository;
    @Value("${jwt.secret}")
    private String jwtSecret;

    public JwtService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    public String generateJwt(String username, List<String> scope) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User Not Found with email: " + username));
        return this.generate(utilisateur, scope);
    }

    private String generate(Utilisateur utilisateur, List<String> scope) {
        Instant instant = Instant.now();
        JwtClaimsSet jwtClaimsSet = JwtClaimsSet
                .builder()
                .issuedAt(instant)
                .expiresAt(instant.plus(24, ChronoUnit.HOURS))
                .subject(utilisateur.getEmail())
                .claim("scope", scope)
                .build();
        JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS512).build(), jwtClaimsSet);
        return jwtEncoder().encode(jwtEncoderParameters).getTokenValue();
    }

    @Bean
    JwtDecoder jwtDecoder() {
        SecretKeySpec secretKeySpec = new SecretKeySpec(jwtSecret.getBytes(), "RSA");
        return NimbusJwtDecoder.withSecretKey(secretKeySpec).macAlgorithm(MacAlgorithm.HS512).build();
    }

    public String extractUsername(String token) {
        return jwtDecoder().decode(token).getSubject();
    }

    public boolean isTokenExpired(String token) {
        Instant expiresAt = jwtDecoder().decode(token).getExpiresAt();
        return Instant.now().isAfter(expiresAt);
    }

    @Bean
    JwtEncoder jwtEncoder() {
        return new NimbusJwtEncoder(new ImmutableSecret<>(jwtSecret.getBytes()));
    }
}


