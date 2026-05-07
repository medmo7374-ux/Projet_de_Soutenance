package com.esgic.schoolmanagementbackend.services;

import com.esgic.schoolmanagementbackend.entities.Quartier;
import com.esgic.schoolmanagementbackend.repositories.QuartierRepository;
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
public class QuartierService {

    private final QuartierRepository quartierRepository;

    public Quartier createQuartier(Quartier quartier) {
        return quartierRepository.save(quartier);
    }

    public Optional<Quartier> getQuartierById(Long id) {
        return quartierRepository.findById(id);
    }

    public List<Quartier> getAllQuartiers() {
        return quartierRepository.findAll();
    }

    public Page<Quartier> searchByCriteria(String criteria, Pageable pageable) {
        return quartierRepository.findByNomContainingIgnoreCase(criteria, pageable);
    }

    public Quartier updateQuartier(Long id, Quartier quartier) {
        Optional<Quartier> existingQuartier = quartierRepository.findById(id);
        if (existingQuartier.isPresent()) {
            Quartier updatedQuartier = existingQuartier.get();
            updatedQuartier.setNom(quartier.getNom());
            return quartierRepository.save(updatedQuartier);
        }
        throw new RuntimeException("Quartier not found with id: " + id);
    }

    public void deleteQuartier(Long id) {
        quartierRepository.deleteById(id);
    }

    public Page<Quartier> allPage(Pageable pageable) {
        return quartierRepository.findAll(pageable);
    }
}
