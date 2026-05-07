package com.esgic.schoolmanagementbackend.entities;


import lombok.Builder;

import java.util.List;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */
@Builder
public record DashboardStats(
        long nombreEtudiant,
        long nombreInscription,
        long nombreFiliere,
        long nombreNiveau,
        long nombreInscriptionAccepter,
        long nombreInscriptionRejeter,
        long nombreInscriptionAttente,
        List<String> niveaux
) {}