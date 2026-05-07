package com.esgic.schoolmanagementbackend.controllers;

import com.esgic.schoolmanagementbackend.entities.Utilisateur;
import com.esgic.schoolmanagementbackend.services.UtilisateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    @PostMapping
    public ResponseEntity<?> createUtilisateur(@RequestBody Utilisateur utilisateur) {
        return utilisateurService.createUtilisateur(utilisateur);
    }

    @PostMapping("/admin")
    public ResponseEntity<?> createAdministrateur(@RequestBody Utilisateur utilisateur) {
        return utilisateurService.createAdministrateur(utilisateur);
    }

    @GetMapping("/search/page")
    public Page<Utilisateur> searchUtilisateursPage(@RequestParam String criteria, Pageable pageable) {
        return utilisateurService.searchByCriteria(criteria, pageable);
    }

    @GetMapping
    public List<Utilisateur> findAll() {
        return utilisateurService.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateur) {
        return utilisateurService.updateUtilisateur(id, utilisateur);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUtilisateur(@PathVariable Long id) {
        return utilisateurService.deleteUtilisateur(id);
    }

    @GetMapping("page")
    public ResponseEntity<Page<Utilisateur>> allPage(Pageable pageable) {
        return utilisateurService.getAllUtilisateurs(pageable);
    }
}
