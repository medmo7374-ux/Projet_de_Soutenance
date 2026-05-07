package com.esgic.schoolmanagementbackend.controllers;

import com.esgic.schoolmanagementbackend.entities.Quartier;
import com.esgic.schoolmanagementbackend.services.QuartierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/quartiers")
public class QuartierController {

    private final QuartierService quartierService;

    @Autowired
    public QuartierController(QuartierService quartierService) {
        this.quartierService = quartierService;
    }

    @PostMapping
    public ResponseEntity<Quartier> createQuartier(@RequestBody Quartier quartier) {
        Quartier createdQuartier = quartierService.createQuartier(quartier);
        return ResponseEntity.ok(createdQuartier);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quartier> getQuartierById(@PathVariable Long id) {
        Optional<Quartier> quartier = quartierService.getQuartierById(id);
        return quartier.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Quartier>> getAllQuartiers() {
        List<Quartier> quartiers = quartierService.getAllQuartiers();
        return ResponseEntity.ok(quartiers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quartier> updateQuartier(@PathVariable Long id, @RequestBody Quartier quartier) {
        Quartier updatedQuartier = quartierService.updateQuartier(id, quartier);
        return ResponseEntity.ok(updatedQuartier);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuartier(@PathVariable Long id) {
        quartierService.deleteQuartier(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-name")
    public ResponseEntity<Page<Quartier>> searchQuartiersPage(@RequestParam(name = "name") String criteria, Pageable pageable) {
        return ResponseEntity.ok(quartierService.searchByCriteria(criteria, pageable));
    }

    @GetMapping("page")
    public ResponseEntity<Page<Quartier>> allPage(Pageable pageable) {
        return ResponseEntity.ok(quartierService.allPage(pageable));
    }
}