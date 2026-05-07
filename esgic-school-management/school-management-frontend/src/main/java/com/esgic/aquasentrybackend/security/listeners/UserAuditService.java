package com.esgic.schoolmanagementbackend.security.listeners;

import com.esgic.schoolmanagementbackend.entities.Utilisateur;
import com.esgic.schoolmanagementbackend.repositories.UtilisateurRepository;
import com.esgic.schoolmanagementbackend.security.auditors.AuditorAwareImpl;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
public class UserAuditService {
    private final AuditorAwareImpl auditorAware;
    private final UtilisateurRepository utilisateurRepository;

    public UserAuditService(AuditorAwareImpl auditorAware, UtilisateurRepository utilisateurRepository) {
        this.auditorAware = auditorAware;
        this.utilisateurRepository = utilisateurRepository;
    }

    public String getCurrentUserDetails() {
        Long currentUserId = Objects.nonNull(auditorAware.getCurrentUser()) ? auditorAware.getCurrentUser().getId() : null;
        Optional<Utilisateur> currentUser = currentUserId != null ? utilisateurRepository.findById(currentUserId) : Optional.empty();
        return currentUser.map(utilisateur -> String.format("%s %s", utilisateur.getPrenom(), utilisateur.getNom())).orElse("anonymous");
    }
}
