package com.esgic.schoolmanagementbackend.dtos;


import com.esgic.schoolmanagementbackend.entities.Filiere;
import com.esgic.schoolmanagementbackend.entities.Niveau;
import com.esgic.schoolmanagementbackend.enums.TypeInscription;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.util.Date;

@Data
public class EtudiantDto {

    private String nom;
    private String prenom;
    private String adresse;
    private String email;
    private String telephone;
    private Date dateNaissance;
    private String lieuNaissance;
    private TypeInscription typeInscription;

    @ManyToOne
    private Filiere filiere;
    @ManyToOne
    private Niveau niveau;
}
