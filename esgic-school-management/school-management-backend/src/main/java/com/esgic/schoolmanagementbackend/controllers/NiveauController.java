package com.esgic.schoolmanagementbackend.controllers;

import com.esgic.schoolmanagementbackend.entities.Niveau;
import com.esgic.schoolmanagementbackend.services.NiveauService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/niveaux")
@RequiredArgsConstructor
public class NiveauController {

    private final NiveauService quartierService;

    @PostMapping
    public ResponseEntity<Niveau> createNiveau(@RequestBody Niveau quartier) {
        Niveau createdNiveau = quartierService.createNiveau(quartier);
        return ResponseEntity.ok(createdNiveau);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Niveau> getNiveauById(@PathVariable Long id) {
        Optional<Niveau> quartier = quartierService.getNiveauById(id);
        return quartier.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Niveau>> getAllNiveaus() {
        List<Niveau> quartiers = quartierService.getAllNiveaus();
        return ResponseEntity.ok(quartiers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Niveau> updateNiveau(@PathVariable Long id, @RequestBody Niveau quartier) {
        Niveau updatedNiveau = quartierService.updateNiveau(id, quartier);
        return ResponseEntity.ok(updatedNiveau);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNiveau(@PathVariable Long id) {
        quartierService.deleteNiveau(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-name")
    public ResponseEntity<Page<Niveau>> searchNiveausPage(@RequestParam(name = "name") String criteria, Pageable pageable) {
        return ResponseEntity.ok(quartierService.searchByCriteria(criteria, pageable));
    }

    @GetMapping("page")
    public ResponseEntity<Page<Niveau>> allPage(Pageable pageable) {
        return ResponseEntity.ok(quartierService.allPage(pageable));
    }
}