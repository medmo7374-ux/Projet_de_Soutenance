package com.esgic.schoolmanagementbackend.entities;


import com.esgic.schoolmanagementbackend.enums.StatutInscription;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "etudiants")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Etudiant extends AbstractEntity {
    private String nom;
    private String prenom;
    private String adresse;
    private String email;
    private String telephone;
    private Date dateNaissance;
    private String lieuNaissance;

    @ManyToOne
    private Filiere filiere;
    @ManyToOne
    private Niveau niveau;

    @Enumerated(EnumType.STRING)
    private StatutInscription statutInscription;
}
