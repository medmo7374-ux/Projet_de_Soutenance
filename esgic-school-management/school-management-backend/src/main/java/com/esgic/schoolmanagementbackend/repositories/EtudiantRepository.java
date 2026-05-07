package com.esgic.schoolmanagementbackend.repositories;

import com.esgic.schoolmanagementbackend.entities.Etudiant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {

    @Query("SELECT e FROM Etudiant e WHERE " +
            "LOWER(e.nom) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.prenom) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.telephone) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.adresse) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(e.lieuNaissance) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Etudiant> searchByKeyword(String keyword, Pageable pageable);
}
