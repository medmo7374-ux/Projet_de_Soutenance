package com.esgic.schoolmanagementbackend.security.auditors;

import com.esgic.schoolmanagementbackend.entities.Utilisateur;
import com.esgic.schoolmanagementbackend.repositories.UtilisateurRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

import static java.lang.Long.parseLong;
import static java.util.Optional.empty;
import static java.util.Optional.of;

@Component
@AllArgsConstructor
public class AuditorAwareImpl implements AuditorAware<String> {
    private final UtilisateurRepository utilisateurRepository;


    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {
            return empty();
        }
        return of(authentication.getName());
    }

    public Utilisateur getCurrentUser() {
        return getCurrentAuditor().isPresent() ?
                utilisateurRepository
                        .findById(parseLong(getCurrentAuditor().get())).get() : null;
    }
}
