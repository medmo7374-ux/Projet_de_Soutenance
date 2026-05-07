package com.esgic.schoolmanagementbackend.repositories;


import com.esgic.schoolmanagementbackend.entities.Inscription;
import com.esgic.schoolmanagementbackend.enums.StatutInscription;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */
public interface InscriptionRepository extends JpaRepository<Inscription, Long> {

    @Query("SELECT i FROM Inscription i WHERE " +
            "LOWER(i.etudiant.nom) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(i.etudiant.prenom) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(i.etudiant.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(i.etudiant.telephone) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(i.etudiant.adresse) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Inscription> searchByEtudiant(String keyword, Pageable pageable);

    Long countByStatutInscription(StatutInscription statutInscription);
}
