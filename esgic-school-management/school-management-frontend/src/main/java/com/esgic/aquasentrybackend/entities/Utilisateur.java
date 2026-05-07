package com.esgic.schoolmanagementbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "utilisateurs")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class Utilisateur  extends AbstractEntity {

    private String nom;
    private String prenom;
    private String email;
    private String username;
    @JsonIgnore
    private String password;
    private String telephone;
    private String adresse;
    private String rue;
    private String porte;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;
}
