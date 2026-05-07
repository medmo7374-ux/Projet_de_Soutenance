package com.esgic.schoolmanagementbackend.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */

@Entity
@Table(name = "quartiers")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Quartier extends AbstractEntity{
    private String nom;
}
