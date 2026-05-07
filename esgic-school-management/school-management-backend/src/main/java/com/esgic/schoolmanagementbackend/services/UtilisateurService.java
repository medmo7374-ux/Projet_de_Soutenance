package com.esgic.schoolmanagementbackend.services;

import com.esgic.schoolmanagementbackend.entities.Role;
import com.esgic.schoolmanagementbackend.entities.Utilisateur;
import com.esgic.schoolmanagementbackend.exceptions.UtilisateurNotFoundException;
import com.esgic.schoolmanagementbackend.repositories.RoleRepository;
import com.esgic.schoolmanagementbackend.repositories.UtilisateurRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;


@Service
@AllArgsConstructor
@Slf4j
public class UtilisateurService {

    private UtilisateurRepository utilisateurRepository;
    private PasswordEncoder passwordEncoder;
    private RoleRepository roleRepository;

    public ResponseEntity<?> createUtilisateur(Utilisateur utilisateur) {
        if (utilisateurRepository.findByEmail(utilisateur.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpServletResponse.SC_CONFLICT)
                    .body("Un utilisateur avec cet email existe déjà !");
        }

        if (utilisateurRepository.findByTelephone(utilisateur.getTelephone()).isPresent()) {
            return ResponseEntity.status(HttpServletResponse.SC_CONFLICT)
                    .body("Un utilisateur avec ce numéro de téléphone existe déjà !");
        }

        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Le rôle USER n'existe pas dans la base de données"));

        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
        utilisateur.setRoles(Collections.singletonList(userRole));

        Utilisateur saved = utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok(saved);
    }

    public ResponseEntity<?> createAdministrateur(Utilisateur utilisateur) {
        if (utilisateurRepository.findByEmail(utilisateur.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpServletResponse.SC_CONFLICT)
                    .body("Un utilisateur avec cet email existe déjà !");
        }

        if (utilisateurRepository.findByTelephone(utilisateur.getTelephone()).isPresent()) {
            return ResponseEntity.status(HttpServletResponse.SC_CONFLICT)
                    .body("Un utilisateur avec ce numéro de téléphone existe déjà !");
        }

        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
        utilisateur.setRoles(roleRepository.findAll());

        Utilisateur saved = utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok(saved);
    }


    public Page<Utilisateur> searchByCriteria(String criteria, Pageable pageable) {
        var sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id").descending());
        return utilisateurRepository.searchByCriteria(criteria, sortedPageable);
    }

    public List<Utilisateur> findAll() {
        return utilisateurRepository.findAll();
    }

    public ResponseEntity<?> updateUtilisateur(Long id, Utilisateur dto) {
        Utilisateur utilisateur = utilisateurRepository.findById(id).orElseThrow(() -> new UtilisateurNotFoundException("Cet utilisateur n'existe pas!"));
        if (utilisateur == null) {
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("Cet identifiant n'existe pas");
        }
        dto.setId(id);
        return ResponseEntity.ok(utilisateurRepository.save(dto));
    }

    public ResponseEntity<String> deleteUtilisateur(Long id) {
        utilisateurRepository.deleteById(id);

        return ResponseEntity.ok("Utilisateur supprimé avec succès");
    }

    public ResponseEntity<Page<Utilisateur>> getAllUtilisateurs(Pageable pageable) {
        return ResponseEntity.ok(utilisateurRepository.findAll(pageable));
    }

    public ResponseEntity<?> getById(Long id) {
        return ResponseEntity.ok(utilisateurRepository.findById(id).orElse(new Utilisateur()));
    }
}
