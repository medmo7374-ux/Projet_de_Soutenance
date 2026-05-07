package com.esgic.schoolmanagementbackend.services;

import com.esgic.schoolmanagementbackend.entities.Gravite;
import com.esgic.schoolmanagementbackend.repositories.GraviteRepository;
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
public class GraviteService {

    private final GraviteRepository graviteRepository;

    public Gravite createGravite(Gravite gravite) {
        return graviteRepository.save(gravite);
    }

    public Optional<Gravite> getGraviteById(Long id) {
        return graviteRepository.findById(id);
    }

    public List<Gravite> getAllGravites() {
        return graviteRepository.findAll();
    }

    public Gravite updateGravite(Long id, Gravite gravite) {
        Optional<Gravite> existingGravite = graviteRepository.findById(id);
        if (existingGravite.isPresent()) {
            Gravite updatedGravite = existingGravite.get();
            updatedGravite.setLibelle(gravite.getLibelle());
            return graviteRepository.save(updatedGravite);
        }
        throw new RuntimeException("Gravite not found with id: " + id);
    }

    public void deleteGravite(Long id) {
        graviteRepository.deleteById(id);
    }

    public Page<Gravite> searchByCriteria(String criteria, Pageable pageable) {
        return graviteRepository.findByLibelleContainingIgnoreCase(criteria, pageable);
    }

    public Page<Gravite> allPage(Pageable pageable) {
        return graviteRepository.findAll(pageable);
    }
}
