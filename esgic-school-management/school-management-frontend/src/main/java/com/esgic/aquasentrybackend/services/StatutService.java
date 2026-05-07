package com.esgic.schoolmanagementbackend.services;

import com.esgic.schoolmanagementbackend.entities.Statut;
import com.esgic.schoolmanagementbackend.repositories.StatutRepository;
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
public class StatutService {

    private final StatutRepository graviteRepository;

    public Statut createStatut(Statut gravite) {
        return graviteRepository.save(gravite);
    }

    public Optional<Statut> getStatutById(Long id) {
        return graviteRepository.findById(id);
    }

    public List<Statut> getAllStatuts() {
        return graviteRepository.findAll();
    }

    public Statut updateStatut(Long id, Statut gravite) {
        Optional<Statut> existingStatut = graviteRepository.findById(id);
        if (existingStatut.isPresent()) {
            Statut updatedStatut = existingStatut.get();
            updatedStatut.setLibelle(gravite.getLibelle());
            return graviteRepository.save(updatedStatut);
        }
        throw new RuntimeException("Statut not found with id: " + id);
    }

    public void deleteStatut(Long id) {
        graviteRepository.deleteById(id);
    }

    public Page<Statut> searchByCriteria(String criteria, Pageable pageable) {
        return graviteRepository.findByLibelleContainingIgnoreCase(criteria, pageable);
    }

    public Page<Statut> allPage(Pageable pageable) {
        return graviteRepository.findAll(pageable);
    }

}
