package com.esgic.schoolmanagementbackend.repositories;

import com.esgic.schoolmanagementbackend.entities.Commune;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */
public interface CommuneRepository extends JpaRepository<Commune, Long> {
    Page<Commune> findByNomContainingIgnoreCase(String nom, Pageable pageable);
}
