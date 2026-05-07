package com.esgic.schoolmanagementbackend.services;

import com.esgic.schoolmanagementbackend.dtos.SignalementDto;
import com.esgic.schoolmanagementbackend.entities.Signalement;
import com.esgic.schoolmanagementbackend.entities.Statut;
import com.esgic.schoolmanagementbackend.repositories.SignalementRepository;
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
public class SignalementService {

    private final SignalementRepository signalementRepository;
    private final StatutRepository statutRepository;

    public Signalement create(SignalementDto dto) {
        var statut = statutRepository.findByLibelle("En attente").orElse(null);
        var signalement = Signalement.builder()
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .adresse(dto.getAdresse())
                .telephone(dto.getTelephone())
                .description(dto.getDescription())
                .commune(dto.getCommune())
                .quartier(dto.getQuartier())
                .gravite(dto.getGravite())
                .date(dto.getDate())
                .statut(statut)
                .build();
        signalementRepository.saveAndFlush(signalement);
        return signalement;
    }

    public Signalement changeStatus(Long id, Statut statut) {
        signalementRepository.findById(id).ifPresentOrElse(signalement -> {
            signalement.setStatut(statut);
            signalementRepository.save(signalement);
        }, () -> log.error("Signalement not found with id: {}", id));
        return signalementRepository.findById(id).orElseThrow(() -> new RuntimeException("Signalement not found with id: " + id));
    }

    public Optional<Signalement> getSignalementById(Long id) {
        return signalementRepository.findById(id);
    }

    public List<Signalement> getAllSignalements() {
        return signalementRepository.findAll();
    }


    public Signalement updateSignalement(Long id, Signalement signalement) {
        Optional<Signalement> existingSignalement = signalementRepository.findById(id);
        if (existingSignalement.isPresent()) {
            Signalement updatedSignalement = existingSignalement.get();
            updatedSignalement.setNom(signalement.getNom());
            updatedSignalement.setPrenom(signalement.getPrenom());
            updatedSignalement.setAdresse(signalement.getAdresse());
            updatedSignalement.setTelephone(signalement.getTelephone());
            updatedSignalement.setDescription(signalement.getDescription());
            updatedSignalement.setDate(signalement.getDate());
            updatedSignalement.setCommune(signalement.getCommune());
            updatedSignalement.setQuartier(signalement.getQuartier());
            updatedSignalement.setGravite(signalement.getGravite());
            updatedSignalement.setStatut(signalement.getStatut());
            return signalementRepository.save(updatedSignalement);
        }
        throw new RuntimeException("Signalement non trouvé avec l'id : " + id);
    }

    public void deleteSignalement(Long id) {
        signalementRepository.deleteById(id);
    }

    public Page<Signalement> searchByCriteria(String criteria, Pageable pageable) {
        return signalementRepository.findByCriteria(criteria, pageable);
    }

    public Page<Signalement> allPage(Pageable pageable) {
        return signalementRepository.findAll(pageable);
    }
}