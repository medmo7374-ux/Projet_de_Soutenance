package com.esgic.schoolmanagementbackend.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */

@Entity
@Table(name = "gravites")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Gravite extends AbstractEntity{
    private String libelle;
}
