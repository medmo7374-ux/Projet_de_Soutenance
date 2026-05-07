package com.esgic.schoolmanagementbackend.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */

@Entity
@Table(name = "statuts")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Statut extends AbstractEntity{
    private String libelle;
}
