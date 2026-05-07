package com.esgic.schoolmanagementbackend.repositories;

import com.esgic.schoolmanagementbackend.entities.Statut;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */
public interface StatutRepository extends JpaRepository<Statut, Long> {
    Optional<Statut> findByLibelle(String libelle);
    Page<Statut> findByLibelleContainingIgnoreCase(String libelle, Pageable pageable);
}
