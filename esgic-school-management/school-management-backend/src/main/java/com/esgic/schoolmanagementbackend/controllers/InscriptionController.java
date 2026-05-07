package com.esgic.schoolmanagementbackend.controllers;

import com.esgic.schoolmanagementbackend.entities.Inscription;
import com.esgic.schoolmanagementbackend.services.InscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("inscriptions")
@RequiredArgsConstructor
public class InscriptionController {

    private final InscriptionService inscriptionService;

    @GetMapping("/search")
    public Page<Inscription> searchInscriptions(
            @RequestParam(name = "criteria", required = false, defaultValue = "") String search, Pageable pageable
    ) {

        return inscriptionService.search(search, pageable);
    }

    @PutMapping("/{id}/accepter")
    public Inscription accepterInscription(@PathVariable Long id) {
        return inscriptionService.accepter(id);
    }

    @PutMapping("/{id}/annuler")
    public Inscription annulerInscription(@PathVariable Long id) {
        return inscriptionService.annuler(id);
    }


    @GetMapping("page")
    public ResponseEntity<Page<Inscription>> allPage(Pageable pageable) {
        return ResponseEntity.ok(inscriptionService.allPage(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inscription> get(@PathVariable Long id) {
        Optional<Inscription> quartier = inscriptionService.getNiveauById(id);
        return quartier.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
