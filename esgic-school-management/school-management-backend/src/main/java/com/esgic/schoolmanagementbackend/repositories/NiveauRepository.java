package com.esgic.schoolmanagementbackend.repositories;

import com.esgic.schoolmanagementbackend.entities.Niveau;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */
public interface NiveauRepository extends JpaRepository <Niveau, Long>{

    Page<Niveau> findByLibelleContainingIgnoreCase(String libelle, Pageable pageable);
}
