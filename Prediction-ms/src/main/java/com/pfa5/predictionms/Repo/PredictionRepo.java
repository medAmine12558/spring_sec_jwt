package com.pfa5.predictionms.Repo;

import com.pfa5.predictionms.Entities.Prediction;
import com.pfa5.predictionms.Model.Evenement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PredictionRepo extends JpaRepository<Prediction, Integer> {}
