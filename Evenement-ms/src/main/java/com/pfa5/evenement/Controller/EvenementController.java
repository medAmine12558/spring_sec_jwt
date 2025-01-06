package com.pfa5.evenement.Controller;

import com.pfa5.evenement.Entities.Evenement;
import com.pfa5.evenement.Service.EvenementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("evenement")
public class EvenementController {
    @Autowired
    EvenementService evenementService;
    @PostMapping("/save")
    public ResponseEntity<Evenement> save(@RequestBody Evenement evenement) {
        Evenement e=evenementService.saveEvenement(evenement);
        return ResponseEntity.ok(e);
    }
    @GetMapping("/Evenement/{id}")
    public Evenement getEvenement(@PathVariable int id) {
//        Map<Optional<Evenement>,String> m=new HashMap<>();
//        m.put(evenementService.getEvenement(id) , evenementService.getEvenement(id).get().getType().getEvent());
        return evenementService.getEvenement(id).get() ;
    }
    @GetMapping("/AllEvenements")
    public List<Evenement> getAllEvenements() {
        return evenementService.getAllEvenement();
    }
}
