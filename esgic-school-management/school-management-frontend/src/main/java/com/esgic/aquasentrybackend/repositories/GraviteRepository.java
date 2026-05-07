package com.esgic.schoolmanagementbackend.repositories;

import com.esgic.schoolmanagementbackend.entities.Gravite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */
public interface GraviteRepository extends JpaRepository <Gravite, Long>{

    Page<Gravite> findByLibelleContainingIgnoreCase(String libelle, Pageable pageable);
}
