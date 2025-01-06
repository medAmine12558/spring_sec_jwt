package com.pfa5.evenement.Repo;

import com.pfa5.evenement.Entities.Evenement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EvenementRepo extends JpaRepository<Evenement, Integer> {
}
