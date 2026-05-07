package com.esgic.schoolmanagementbackend.services;


import com.esgic.schoolmanagementbackend.entities.Inscription;
import com.esgic.schoolmanagementbackend.enums.StatutInscription;
import com.esgic.schoolmanagementbackend.repositories.EtudiantRepository;
import com.esgic.schoolmanagementbackend.repositories.InscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */

@Service
@RequiredArgsConstructor
public class InscriptionService {

    private final InscriptionRepository inscriptionRepository;
    private final EtudiantRepository etudiantRepository;

    public Page<Inscription> search(String search, Pageable pageable) {
        return inscriptionRepository.searchByEtudiant(search, pageable);
    }

    public Inscription accepter(Long id) {
        var result = inscriptionRepository.findById(id);

        if (result.isEmpty()) {
            return null;
        }

        var inscription = result.get();

        inscription.setStatutInscription(StatutInscription.VALIDER);
        var etudiant = inscription.getEtudiant();

        if (etudiant != null) {
            etudiant.setStatutInscription(StatutInscription.VALIDER);
            etudiantRepository.save(etudiant);
        }

        return inscriptionRepository.save(inscription);
    }

    public Inscription annuler(Long id) {
        var result = inscriptionRepository.findById(id);

        if (result.isEmpty()) {
            return null;
        }

        var inscription = result.get();

        inscription.setStatutInscription(StatutInscription.ANNULER);
        var etudiant = inscription.getEtudiant();

        if (etudiant != null) {
            etudiant.setStatutInscription(StatutInscription.ANNULER);
            etudiantRepository.save(etudiant);
        }

        return inscriptionRepository.save(inscription);
    }

    public Page<Inscription> allPage(Pageable pageable) {
        return inscriptionRepository.findAll(pageable);
    }

    public Optional<Inscription> getNiveauById(Long id) {
        return inscriptionRepository.findById(id);
    }

}
