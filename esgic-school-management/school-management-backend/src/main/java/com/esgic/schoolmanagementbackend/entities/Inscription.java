package com.esgic.schoolmanagementbackend.entities;


import com.esgic.schoolmanagementbackend.enums.StatutInscription;
import com.esgic.schoolmanagementbackend.enums.TypeInscription;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "inscriptions")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Inscription extends AbstractEntity {

    private Date dateInscription;
    @Enumerated(EnumType.STRING)
    private StatutInscription statutInscription;
    @Enumerated(EnumType.STRING)
    private TypeInscription typeInscription;

    @OneToOne
    private Etudiant etudiant;
}
