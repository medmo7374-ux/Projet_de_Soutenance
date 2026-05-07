package com.esgic.schoolmanagementbackend.services;


import com.esgic.schoolmanagementbackend.entities.DashboardStats;
import com.esgic.schoolmanagementbackend.entities.Niveau;
import com.esgic.schoolmanagementbackend.enums.StatutInscription;
import com.esgic.schoolmanagementbackend.repositories.EtudiantRepository;
import com.esgic.schoolmanagementbackend.repositories.FiliereRepository;
import com.esgic.schoolmanagementbackend.repositories.InscriptionRepository;
import com.esgic.schoolmanagementbackend.repositories.NiveauRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardStatService {

    private final EtudiantRepository etudiantRepository;
    private final InscriptionRepository inscriptionRepository;

    private final NiveauRepository niveauRepository;
    private final FiliereRepository filiereRepository;

    public DashboardStats stats() {
        var nbreNiveau = niveauRepository.count();
        var nbreFiliere = filiereRepository.count();
        var nbreInscription = inscriptionRepository.count();
        var nbreEtudiants = etudiantRepository.count();

        var valid = inscriptionRepository.countByStatutInscription(StatutInscription.VALIDER);
        var annuler = inscriptionRepository.countByStatutInscription(StatutInscription.ANNULER);
        var attente = inscriptionRepository.countByStatutInscription(StatutInscription.EN_ATTENTE);

        List<String> niveaux = List.of(niveauRepository.findAll().stream().map(Niveau::getLibelle).toArray(String[]::new));

        return DashboardStats
                .builder()
                .niveaux(niveaux)
                .nombreEtudiant(nbreEtudiants)
                .nombreInscription(nbreInscription)
                .nombreNiveau(nbreNiveau)
                .nombreInscriptionRejeter(annuler)
                .nombreInscriptionAttente(attente)
                .nombreInscriptionAccepter(valid)
                .nombreFiliere(nbreFiliere)
                .build();

    }
}
