package com.esgic.schoolmanagementbackend.services;

import com.esgic.schoolmanagementbackend.entities.Filiere;
import com.esgic.schoolmanagementbackend.repositories.FiliereRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class FiliereService {

    private final FiliereRepository filiereRepository;

    public Filiere createFiliere(Filiere filiere) {
        return filiereRepository.save(filiere);
    }

    public Optional<Filiere> getFiliereById(Long id) {
        return filiereRepository.findById(id);
    }

    public List<Filiere> getAllFilieres() {
        return filiereRepository.findAll();
    }

    public Filiere updateFiliere(Long id, Filiere filiere) {
        Optional<Filiere> existingFiliere = filiereRepository.findById(id);
        if (existingFiliere.isPresent()) {
            Filiere updatedFiliere = existingFiliere.get();
            updatedFiliere.setNom(filiere.getNom());
            updatedFiliere.setLibelle(filiere.getLibelle());
            return filiereRepository.save(updatedFiliere);
        }
        throw new RuntimeException("Filiere not found with id: " + id);
    }

    public void deleteFiliere(Long id) {
        filiereRepository.deleteById(id);
    }

    public Page<Filiere> searchByCriteria(String criteria, Pageable pageable) {
        return filiereRepository.findByNomContainingIgnoreCase(criteria, pageable);
    }

    public Page<Filiere> allPage(Pageable pageable) {
        return filiereRepository.findAll(pageable);
    }
}
