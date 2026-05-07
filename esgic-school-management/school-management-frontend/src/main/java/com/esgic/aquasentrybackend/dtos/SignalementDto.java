package com.esgic.schoolmanagementbackend.dtos;


import com.esgic.schoolmanagementbackend.entities.Commune;
import com.esgic.schoolmanagementbackend.entities.Gravite;
import com.esgic.schoolmanagementbackend.entities.Quartier;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */
@Data
@Builder
public class SignalementDto {

    private String nom;
    private String prenom;
    private String adresse;
    private String telephone;
    private String description;

    private LocalDateTime date;

    private Commune commune;

    private Quartier quartier;

    private Gravite gravite;

}
