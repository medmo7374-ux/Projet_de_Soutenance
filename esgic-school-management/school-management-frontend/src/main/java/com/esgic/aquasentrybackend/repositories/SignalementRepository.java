package com.esgic.schoolmanagementbackend.repositories;

import com.esgic.schoolmanagementbackend.entities.Signalement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SignalementRepository extends JpaRepository<Signalement, Long> {

    @Query("SELECT s FROM Signalement s WHERE LOWER(s.nom) LIKE LOWER(CONCAT('%', :criteria, '%')) " +
            "OR LOWER(s.prenom) LIKE LOWER(CONCAT('%', :criteria, '%')) " +
            "OR LOWER(s.adresse) LIKE LOWER(CONCAT('%', :criteria, '%')) " +
            "OR LOWER(s.telephone) LIKE LOWER(CONCAT('%', :criteria, '%')) " +
            "OR LOWER(s.description) LIKE LOWER(CONCAT('%', :criteria, '%'))")
    Page<Signalement> findByCriteria(@Param("criteria") String criteria, Pageable pageable);
}
