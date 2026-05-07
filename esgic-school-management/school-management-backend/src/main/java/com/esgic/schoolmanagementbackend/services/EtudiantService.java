package com.esgic.schoolmanagementbackend.services;

import com.esgic.schoolmanagementbackend.dtos.EtudiantDto;
import com.esgic.schoolmanagementbackend.entities.Etudiant;
import com.esgic.schoolmanagementbackend.entities.Filiere;
import com.esgic.schoolmanagementbackend.entities.Inscription;
import com.esgic.schoolmanagementbackend.entities.Niveau;
import com.esgic.schoolmanagementbackend.enums.StatutInscription;
import com.esgic.schoolmanagementbackend.enums.TypeInscription;
import com.esgic.schoolmanagementbackend.repositories.EtudiantRepository;
import com.esgic.schoolmanagementbackend.repositories.InscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EtudiantService {

    private final EtudiantRepository etudiantRepository;
    private final InscriptionRepository inscriptionRepository;

    public Etudiant createInscription(EtudiantDto etudiantDto) {

        var ___ = Etudiant
                .builder()
                .nom(etudiantDto.getNom())
                .prenom(etudiantDto.getPrenom())
                .email(etudiantDto.getEmail())
                .adresse(etudiantDto.getAdresse())
                .statutInscription(StatutInscription.EN_ATTENTE)
                .filiere(etudiantDto.getFiliere())
                .dateNaissance(etudiantDto.getDateNaissance())
                .lieuNaissance(etudiantDto.getLieuNaissance())
                .niveau(etudiantDto.getNiveau())
                .telephone(etudiantDto.getTelephone())
                .build();

        var etudiant = etudiantRepository.save(___);

        var ____ = Inscription
                .builder()
                .dateInscription(Date.from(Instant.now()))
                .statutInscription(StatutInscription.EN_ATTENTE)
                .typeInscription(etudiantDto.getTypeInscription())
                .etudiant(etudiant)
                .build();
        inscriptionRepository.save(____);
        return etudiant;
    }

    public Page<Etudiant> search(String keyword, Pageable pageable) {
        return etudiantRepository.searchByKeyword(keyword, pageable);
    }

    public Page<Etudiant> allPage(Pageable pageable) {
        return etudiantRepository.findAll(pageable);
    }

    public Optional<Etudiant> getNiveauById(Long id) {
        return etudiantRepository.findById(id);
    }

}
