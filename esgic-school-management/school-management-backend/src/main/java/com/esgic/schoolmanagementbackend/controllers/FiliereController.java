package com.esgic.schoolmanagementbackend.controllers;

import com.esgic.schoolmanagementbackend.entities.Filiere;
import com.esgic.schoolmanagementbackend.services.FiliereService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/filieres")
@RequiredArgsConstructor
public class FiliereController {

    private final FiliereService filiereService;

    @PostMapping
    public ResponseEntity<Filiere> createFiliere(@RequestBody Filiere quartier) {
        Filiere createdFiliere = filiereService.createFiliere(quartier);
        return ResponseEntity.ok(createdFiliere);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filiere> getFiliereById(@PathVariable Long id) {
        Optional<Filiere> quartier = filiereService.getFiliereById(id);
        return quartier.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Filiere>> getAllFilieres() {
        List<Filiere> quartiers = filiereService.getAllFilieres();
        return ResponseEntity.ok(quartiers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Filiere> updateFiliere(@PathVariable Long id, @RequestBody Filiere quartier) {
        Filiere updatedFiliere = filiereService.updateFiliere(id, quartier);
        return ResponseEntity.ok(updatedFiliere);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFiliere(@PathVariable Long id) {
        filiereService.deleteFiliere(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-name")
    public ResponseEntity<Page<Filiere>> searchFilieresPage(@RequestParam(name = "name") String criteria, Pageable pageable) {
        return ResponseEntity.ok(filiereService.searchByCriteria(criteria, pageable));
    }

    @GetMapping("page")
    public ResponseEntity<Page<Filiere>> allPage(Pageable pageable) {
        return ResponseEntity.ok(filiereService.allPage(pageable));
    }
}