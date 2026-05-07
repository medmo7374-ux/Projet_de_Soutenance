package com.esgic.schoolmanagementbackend.controllers;

import com.esgic.schoolmanagementbackend.dtos.EtudiantDto;
import com.esgic.schoolmanagementbackend.entities.Etudiant;
import com.esgic.schoolmanagementbackend.services.EtudiantService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("etudiants")
@RequiredArgsConstructor
public class EtudiantController {

    private final EtudiantService etudiantService;

    @PostMapping("inscription")
    public ResponseEntity<?> createEtudiantInscription(@RequestBody EtudiantDto etudiant) {
        return ResponseEntity.ok(etudiantService.createInscription(etudiant));
    }

    @GetMapping("/search")
    public Page<Etudiant> searchEtudiants(
            @RequestParam(name = "criteria", required = false, defaultValue = "") String search, Pageable pageable
    ) {

        return etudiantService.search(search, pageable);
    }

    @GetMapping("page")
    public ResponseEntity<Page<Etudiant>> allPage(Pageable pageable) {
        return ResponseEntity.ok(etudiantService.allPage(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Etudiant> get(@PathVariable Long id) {
        Optional<Etudiant> quartier = etudiantService.getNiveauById(id);
        return quartier.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
