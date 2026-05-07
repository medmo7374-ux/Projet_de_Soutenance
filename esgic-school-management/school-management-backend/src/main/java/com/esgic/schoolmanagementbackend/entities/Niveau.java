package com.esgic.schoolmanagementbackend.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "niveaux")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Niveau extends AbstractEntity{
    private String libelle;
    private Long montant;
}
