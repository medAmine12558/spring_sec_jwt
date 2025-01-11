package com.pfa5.predictionms.Controller;
import com.netflix.discovery.converters.Auto;
import com.pfa5.predictionms.Entities.Prediction;
import com.pfa5.predictionms.Model.Evenement;
import com.pfa5.predictionms.Repo.PredictionRepo;
import com.pfa5.predictionms.Services.EvenementRestClient;
import com.pfa5.predictionms.Services.PredictionService;
import com.pfa5.predictionms.Services.UserRestClient;
import com.pfa5.type_evenement_enumms.Type_Evenement_Enum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pred")
public class PredictionController {
    @Autowired
    PredictionService predictionService;
    @Autowired
    EvenementRestClient evenementRestClient;
    @Autowired
    UserRestClient userRestClient;
    @Autowired
    private PredictionRepo predictionRepo;

    @GetMapping("/test")
    public String test() {
        String e = Type_Evenement_Enum.Event1.getEvent();
        return e;
    }
    @PostMapping("/save")
    public ResponseEntity<Prediction> save(@RequestBody Prediction prediction,@RequestHeader("Authorization") String token) {
        if(prediction.getEvenement().getId()==null){
            prediction.getEvenement().setId(0);
        }
        if(evenementRestClient.evenementPresent(prediction.getEvenement().getId())){
            prediction.setId_evenement(prediction.getEvenement().getId());
            prediction.setUser(userRestClient.getMe(token));
            prediction.setId_user(prediction.getUser().getId());
            Prediction p=predictionService.save(prediction);
            return ResponseEntity.ok(p);
        }else {
            prediction.getEvenement().setId(null);
            Evenement savedEvenement = evenementRestClient.saveEvenement(prediction.getEvenement());
            prediction.setId_evenement(savedEvenement.getId());
            prediction.setUser(userRestClient.getMe(token));
            prediction.setId_user(prediction.getUser().getId());
            Prediction p = predictionService.save(prediction);
            return ResponseEntity.ok(p);
        }

    }
    @GetMapping("/Prediction/{id}")
        public ResponseEntity<Prediction> getPrediction(@PathVariable int id) {
        return ResponseEntity.ok(predictionService.findById(id));
    }
    @GetMapping("/statisticDate")
    public ResponseEntity<Map<String,String>> getPredictionDate(@RequestBody Map<String , String> data) {
        String year=data.get("annee");
        Map<String,String> map=new HashMap<>();
        map.put("happy",predictionService.getCountOfPredictionsByYear("happy",year));
        map.put("sad",predictionService.getCountOfPredictionsByYear("sad",year));
        map.put("angry",predictionService.getCountOfPredictionsByYear("angry",year));
        return ResponseEntity.ok(map);

    }


}
