package com.esgic.schoolmanagementbackend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "signalements")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Signalement extends AbstractEntity {

    private String nom;
    private String prenom;
    private String adresse;
    private String telephone;
    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime date;

    @ManyToOne
    private Commune commune;

    @ManyToOne
    private Quartier quartier;

    @ManyToOne
    private Gravite gravite;

    @ManyToOne
    private Statut statut;
}
