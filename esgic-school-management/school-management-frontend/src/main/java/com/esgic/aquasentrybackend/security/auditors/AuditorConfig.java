package com.esgic.schoolmanagementbackend.security.auditors;

import com.esgic.schoolmanagementbackend.repositories.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
@AllArgsConstructor
public class AuditorConfig {

    private UtilisateurRepository utilisateurRepository;

    @Bean
    public AuditorAware<String> auditorProvider() {
        return new AuditorAwareImpl(utilisateurRepository);
    }
}
