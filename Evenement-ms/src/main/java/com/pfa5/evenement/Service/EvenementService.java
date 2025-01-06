package com.pfa5.evenement.Service;

import com.pfa5.evenement.Entities.Evenement;
import com.pfa5.evenement.Repo.EvenementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EvenementService {
    @Autowired
    EvenementRepo evenementRepo;
    public Evenement saveEvenement(Evenement evenement) {
        return evenementRepo.save(evenement);
    }
    public Optional<Evenement> getEvenement(int id) {
        return evenementRepo.findById(id);
    }
    public List<Evenement> getAllEvenement() {
        return evenementRepo.findAll();
    }
}
