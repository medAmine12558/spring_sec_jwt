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

import java.util.*;

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
            prediction.setIdEvenement(prediction.getEvenement().getId());
            prediction.setUser(userRestClient.getMe(token));
            prediction.setId_user(prediction.getUser().getId());
            Prediction p=predictionService.save(prediction);
            return ResponseEntity.ok(p);
        }else {
            prediction.getEvenement().setId(null);
            Evenement savedEvenement = evenementRestClient.saveEvenement(prediction.getEvenement());
            prediction.setIdEvenement(savedEvenement.getId());
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
    public ResponseEntity<List<Map<String,String>>> getPredictionDate(@RequestParam Map<String , String> data) {
        String year=data.get("annee");
        List<Map<String,String>> l=new ArrayList<>();
        Map<String,String> happymap=new HashMap<>();
        happymap.put("emotion","happy");
        happymap.put("prediction",predictionService.getCountOfPredictionsByYear("happy",year));
        l.add(happymap);
        Map<String,String> sadmap=new HashMap<>();
        sadmap.put("emotion","sad");
        sadmap.put("prediction",predictionService.getCountOfPredictionsByYear("sad",year));
        l.add(sadmap);
        Map<String,String> angreymap=new HashMap<>();
        angreymap.put("emotion","angrey");
        angreymap.put("prediction",predictionService.getCountOfPredictionsByYear("angrey",year));
        l.add(angreymap);
        return ResponseEntity.ok(l);

    }
    @GetMapping("/statisticEvenement")
    public ResponseEntity<List<Map<String,String>>> getPredictionEvenement(@RequestParam Map<String , String> data) {
        Integer id_event=Integer.valueOf(data.get("id_event"));
        Integer counthappy=0;
        List<Map<String,String>> l=new ArrayList<>();
        //pour l'emotion happy
        Map<String,String> happymap=new HashMap<>();
        happymap.put("emotion","happy");
        happymap.put("number",String.valueOf(predictionService.findById_evenement((id_event)).stream().filter(i-> i.getPrediction().equals("happy")).count()));
        l.add(happymap);
        //pour l'emotion sad
        Map<String,String> sadmap=new HashMap<>();
        sadmap.put("emotion","sad");
        sadmap.put("number",String.valueOf(predictionService.findById_evenement((id_event)).stream().filter(i-> i.getPrediction().equals("sad")).count()));
        l.add(sadmap);
        //pour l'emotion angrey
        Map<String,String> angreymap=new HashMap<>();
        angreymap.put("emotion","angrey");
        angreymap.put("number",String.valueOf(predictionService.findById_evenement((id_event)).stream().filter(i-> i.getPrediction().equals("angrey")).count()));
        l.add(angreymap);
        return ResponseEntity.ok(l);

    }


}
