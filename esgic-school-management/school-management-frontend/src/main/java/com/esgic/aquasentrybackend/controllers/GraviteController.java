package com.esgic.schoolmanagementbackend.controllers;

import com.esgic.schoolmanagementbackend.entities.Gravite;
import com.esgic.schoolmanagementbackend.services.GraviteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/gravites")
@RequiredArgsConstructor
public class GraviteController {

    private final GraviteService quartierService;

    @PostMapping
    public ResponseEntity<Gravite> createGravite(@RequestBody Gravite quartier) {
        Gravite createdGravite = quartierService.createGravite(quartier);
        return ResponseEntity.ok(createdGravite);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Gravite> getGraviteById(@PathVariable Long id) {
        Optional<Gravite> quartier = quartierService.getGraviteById(id);
        return quartier.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Gravite>> getAllGravites() {
        List<Gravite> quartiers = quartierService.getAllGravites();
        return ResponseEntity.ok(quartiers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Gravite> updateGravite(@PathVariable Long id, @RequestBody Gravite quartier) {
        Gravite updatedGravite = quartierService.updateGravite(id, quartier);
        return ResponseEntity.ok(updatedGravite);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGravite(@PathVariable Long id) {
        quartierService.deleteGravite(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-name")
    public ResponseEntity<Page<Gravite>> searchGravitesPage(@RequestParam(name = "name") String criteria, Pageable pageable) {
        return ResponseEntity.ok(quartierService.searchByCriteria(criteria, pageable));
    }

    @GetMapping("page")
    public ResponseEntity<Page<Gravite>> allPage(Pageable pageable) {
        return ResponseEntity.ok(quartierService.allPage(pageable));
    }
}