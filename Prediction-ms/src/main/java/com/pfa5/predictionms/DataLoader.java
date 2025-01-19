package com.pfa5.predictionms;

import com.pfa5.predictionms.Entities.Prediction;
import com.pfa5.predictionms.Model.Evenement;
import com.pfa5.predictionms.Repo.PredictionRepo;
import com.pfa5.type_evenement_enumms.Type_Evenement_Enum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired
    PredictionRepo predictionRepo;
    @Override
    public void run(String... args) throws Exception {
        Evenement e=new Evenement("ok", Type_Evenement_Enum.Event1);
        Prediction prediction=new Prediction("happy",e);
        prediction.setIdEvenement(1);
        Prediction prediction1=new Prediction("happy",e);
        prediction1.setIdEvenement(1);
        Prediction prediction2=new Prediction("sad",e);
        prediction2.setIdEvenement(1);
        Prediction prediction3=new Prediction("angry",e);
        prediction3.setIdEvenement(1);
        Prediction prediction4=new Prediction("happy",e);
        prediction4.setIdEvenement(1);
        Prediction prediction5=new Prediction("happy",e);
        prediction5.setIdEvenement(1);
        prediction5.setDate("2024-05-23");
        Prediction prediction6=new Prediction("sad",e);
        prediction6.setIdEvenement(1);
        prediction6.setDate("2024-05-23");
        Prediction prediction7=new Prediction("angry",e);
        prediction7.setIdEvenement(1);
        prediction7.setDate("2024-05-23");
        predictionRepo.save(prediction1);
        predictionRepo.save(prediction2);
        predictionRepo.save(prediction3);
        predictionRepo.save(prediction4);
        predictionRepo.save(prediction5);
        predictionRepo.save(prediction6);
        predictionRepo.save(prediction7);

    }
}
