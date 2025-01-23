package com.pfa5.predictionms.Services;

import com.pfa5.predictionms.Entities.Prediction;
import com.pfa5.predictionms.Repo.PredictionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PredictionService {
    @Autowired
    PredictionRepo predictionRepo;

    public Prediction save(Prediction prediction) {
        return predictionRepo.save(prediction);
    }
    public Prediction findById(int id) {
        return predictionRepo.findById(id).get();
    }
    public String getCountOfPredictionsByYear(String predection ,String year) {
        return String.valueOf(predictionRepo.findByPredictionAndDateContaining(predection,year).size());
    }
    public List<Prediction> findById_evenement(Integer id_evenement) {
        return predictionRepo.findByIdEvenement(id_evenement);
    }
    public List<Prediction> findAll() {
        return predictionRepo.findAll();
    }
}
