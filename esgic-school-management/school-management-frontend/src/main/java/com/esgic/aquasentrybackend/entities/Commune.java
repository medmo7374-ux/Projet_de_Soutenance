package com.esgic.schoolmanagementbackend.entities;

import jakarta.persistence.*;
import lombok.*;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */

@Entity
@Table(name = "communes")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Commune extends AbstractEntity {
    private String nom;
}
