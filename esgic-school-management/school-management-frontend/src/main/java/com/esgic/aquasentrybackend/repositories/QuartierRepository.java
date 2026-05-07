package com.esgic.schoolmanagementbackend.repositories;

import com.esgic.schoolmanagementbackend.entities.Quartier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */
public interface QuartierRepository extends JpaRepository<Quartier, Long> {

    Page<Quartier> findByNomContainingIgnoreCase(String nom, Pageable pageable);
}
