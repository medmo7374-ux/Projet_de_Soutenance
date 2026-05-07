package com.esgic.schoolmanagementbackend.repositories;

import com.esgic.schoolmanagementbackend.entities.Utilisateur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    Optional<Utilisateur> findByEmail(String email);
    Optional<Utilisateur> findByUsername(String username);
    Optional<Utilisateur> findByTelephone(String telephone);
    @Query("""
        SELECT u FROM Utilisateur u
        WHERE LOWER(u.nom) LIKE LOWER(CONCAT('%', :criteria, '%'))
        OR LOWER(u.prenom) LIKE LOWER(CONCAT('%', :criteria, '%'))
        OR LOWER(u.email) LIKE LOWER(CONCAT('%', :criteria, '%'))
        OR LOWER(u.telephone) LIKE LOWER(CONCAT('%', :criteria, '%'))
    """)
    Page<Utilisateur> searchByCriteria(String criteria, Pageable pageable);

}

