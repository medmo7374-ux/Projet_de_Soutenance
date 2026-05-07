package com.esgic.schoolmanagementbackend.controllers;

import com.esgic.schoolmanagementbackend.dtos.SignalementDto;
import com.esgic.schoolmanagementbackend.entities.Signalement;
import com.esgic.schoolmanagementbackend.entities.Statut;
import com.esgic.schoolmanagementbackend.services.SignalementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */
@RestController
@RequestMapping("signalements")
public class SignalementController {

    private final SignalementService signalementService;

    @Autowired
    public SignalementController(SignalementService signalementService) {
        this.signalementService = signalementService;
    }

    @PostMapping
    public ResponseEntity<Signalement> createSignalement(@RequestBody SignalementDto signalementDto) {
        Signalement createdSignalement = signalementService.create(signalementDto);
        return ResponseEntity.ok(createdSignalement);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Signalement> changeStatus(@PathVariable Long id, @RequestBody Statut statut) {
        Signalement updatedSignalement = signalementService.changeStatus(id, statut);
        return ResponseEntity.ok(updatedSignalement);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Signalement> getSignalementById(@PathVariable Long id) {
        Optional<Signalement> signalement = signalementService.getSignalementById(id);
        return signalement.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Signalement>> getAllSignalements() {
        List<Signalement> signalements = signalementService.getAllSignalements();
        return ResponseEntity.ok(signalements);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Signalement> updateSignalement(@PathVariable Long id, @RequestBody Signalement signalement) {
        Signalement updatedSignalement = signalementService.updateSignalement(id, signalement);
        return ResponseEntity.ok(updatedSignalement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSignalement(@PathVariable Long id) {
        signalementService.deleteSignalement(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Signalement>> searchByCriteria(@RequestParam(name = "name") String criteria, Pageable pageable) {
        Page<Signalement> signalements = signalementService.searchByCriteria(criteria, pageable);
        return ResponseEntity.ok(signalements);
    }

    @GetMapping("page")
    public ResponseEntity<Page<Signalement>> allPage(Pageable pageable) {
        return ResponseEntity.ok(signalementService.allPage(pageable));
    }
}