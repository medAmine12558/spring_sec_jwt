package com.pfa5.predictionms.Repo;

import com.pfa5.predictionms.Entities.Prediction;
import com.pfa5.predictionms.Model.Evenement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PredictionRepo extends JpaRepository<Prediction, Integer> {
    public List<Prediction> findByPredictionAndDateContaining(String prediction, String date);
    public List<Prediction> findByIdEvenement(Integer id_evenement);
    public List<Prediction> findByDate(String date);
}
