package com.esgic.schoolmanagementbackend.services;

import com.esgic.schoolmanagementbackend.entities.Niveau;
import com.esgic.schoolmanagementbackend.repositories.NiveauRepository;
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
public class NiveauService {

    private final NiveauRepository niveauRepository;

    public Niveau createNiveau(Niveau niveau) {
        return niveauRepository.save(niveau);
    }

    public Optional<Niveau> getNiveauById(Long id) {
        return niveauRepository.findById(id);
    }

    public List<Niveau> getAllNiveaus() {
        return niveauRepository.findAll();
    }

    public Niveau updateNiveau(Long id, Niveau niveau) {
        Optional<Niveau> existingNiveau = niveauRepository.findById(id);
        if (existingNiveau.isPresent()) {
            Niveau updatedNiveau = existingNiveau.get();
            updatedNiveau.setLibelle(niveau.getLibelle());
            updatedNiveau.setMontant(niveau.getMontant());
            return niveauRepository.save(updatedNiveau);
        }
        throw new RuntimeException("Niveau not found with id: " + id);
    }

    public void deleteNiveau(Long id) {
        niveauRepository.deleteById(id);
    }

    public Page<Niveau> searchByCriteria(String criteria, Pageable pageable) {
        return niveauRepository.findByLibelleContainingIgnoreCase(criteria, pageable);
    }

    public Page<Niveau> allPage(Pageable pageable) {
        return niveauRepository.findAll(pageable);
    }
}
