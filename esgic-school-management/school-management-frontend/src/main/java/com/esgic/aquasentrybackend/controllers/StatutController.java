package com.esgic.schoolmanagementbackend.controllers;

import com.esgic.schoolmanagementbackend.entities.Statut;
import com.esgic.schoolmanagementbackend.services.StatutService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/statuts")
@RequiredArgsConstructor
public class StatutController {

    private final StatutService statutService;

    @PostMapping
    public ResponseEntity<Statut> createStatut(@RequestBody Statut quartier) {
        Statut createdStatut = statutService.createStatut(quartier);
        return ResponseEntity.ok(createdStatut);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Statut> getStatutById(@PathVariable Long id) {
        Optional<Statut> quartier = statutService.getStatutById(id);
        return quartier.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Statut>> getAllStatuts() {
        List<Statut> quartiers = statutService.getAllStatuts();
        return ResponseEntity.ok(quartiers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Statut> updateStatut(@PathVariable Long id, @RequestBody Statut quartier) {
        Statut updatedStatut = statutService.updateStatut(id, quartier);
        return ResponseEntity.ok(updatedStatut);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStatut(@PathVariable Long id) {
        statutService.deleteStatut(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-name")
    public ResponseEntity<Page<Statut>> searchStatutsPage(@RequestParam(name = "name") String criteria, Pageable pageable) {
        return ResponseEntity.ok(statutService.searchByCriteria(criteria, pageable));
    }

    @GetMapping("page")
    public ResponseEntity<Page<Statut>> allPage(Pageable pageable) {
        return ResponseEntity.ok(statutService.allPage(pageable));
    }
}