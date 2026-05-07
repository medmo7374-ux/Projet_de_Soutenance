package com.esgic.schoolmanagementbackend.controllers;

import com.esgic.schoolmanagementbackend.entities.Commune;
import com.esgic.schoolmanagementbackend.services.CommuneService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/communes")
@RequiredArgsConstructor
public class CommuneController {

    private final CommuneService communeService;

    @PostMapping
    public ResponseEntity<Commune> createCommune(@RequestBody Commune quartier) {
        Commune createdCommune = communeService.createCommune(quartier);
        return ResponseEntity.ok(createdCommune);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Commune> getCommuneById(@PathVariable Long id) {
        Optional<Commune> quartier = communeService.getCommuneById(id);
        return quartier.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Commune>> getAllCommunes() {
        List<Commune> quartiers = communeService.getAllCommunes();
        return ResponseEntity.ok(quartiers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Commune> updateCommune(@PathVariable Long id, @RequestBody Commune quartier) {
        Commune updatedCommune = communeService.updateCommune(id, quartier);
        return ResponseEntity.ok(updatedCommune);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommune(@PathVariable Long id) {
        communeService.deleteCommune(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-name")
    public ResponseEntity<Page<Commune>> searchCommunesPage(@RequestParam(name = "name") String criteria, Pageable pageable) {
        return ResponseEntity.ok(communeService.searchByCriteria(criteria, pageable));
    }

    @GetMapping("page")
    public ResponseEntity<Page<Commune>> allPage(Pageable pageable) {
        return ResponseEntity.ok(communeService.allPage(pageable));
    }
}