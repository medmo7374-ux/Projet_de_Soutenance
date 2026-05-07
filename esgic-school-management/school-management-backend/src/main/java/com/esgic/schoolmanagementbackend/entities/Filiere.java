package com.esgic.schoolmanagementbackend.entities;

import jakarta.persistence.*;
import lombok.*;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */

@Entity
@Table(name = "filieres")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Filiere extends AbstractEntity {
    private String nom;
    private String libelle;
}
