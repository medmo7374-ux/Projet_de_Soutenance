package com.esgic.schoolmanagementbackend.services;

import com.esgic.schoolmanagementbackend.entities.Commune;
import com.esgic.schoolmanagementbackend.repositories.CommuneRepository;
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
public class CommuneService {

    private final CommuneRepository communeRepository;

    public Commune createCommune(Commune commune) {
        return communeRepository.save(commune);
    }

    public Optional<Commune> getCommuneById(Long id) {
        return communeRepository.findById(id);
    }

    public List<Commune> getAllCommunes() {
        return communeRepository.findAll();
    }

    public Commune updateCommune(Long id, Commune commune) {
        Optional<Commune> existingCommune = communeRepository.findById(id);
        if (existingCommune.isPresent()) {
            Commune updatedCommune = existingCommune.get();
            updatedCommune.setNom(commune.getNom());
            return communeRepository.save(updatedCommune);
        }
        throw new RuntimeException("Commune not found with id: " + id);
    }

    public void deleteCommune(Long id) {
        communeRepository.deleteById(id);
    }

    public Page<Commune> searchByCriteria(String criteria, Pageable pageable) {
        return communeRepository.findByNomContainingIgnoreCase(criteria, pageable);
    }

    public Page<Commune> allPage(Pageable pageable) {
        return communeRepository.findAll(pageable);
    }
}
