package com.esgic.schoolmanagementbackend.repositories;

import com.esgic.schoolmanagementbackend.entities.Filiere;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */
public interface FiliereRepository extends JpaRepository<Filiere, Long> {
    Page<Filiere> findByNomContainingIgnoreCase(String nom, Pageable pageable);
}
