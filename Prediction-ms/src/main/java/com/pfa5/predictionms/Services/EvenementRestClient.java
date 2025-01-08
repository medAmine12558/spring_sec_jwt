package com.pfa5.predictionms.Services;

import com.pfa5.predictionms.Model.Evenement;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "EVENEMENT")
public interface EvenementRestClient {
    @PostMapping(path = "/evenement/save")
    Evenement saveEvenement(Evenement evenement);
    @GetMapping(path = "/evenement/evenementpresent/{id}")
    boolean evenementPresent(@PathVariable("id") int id);
}
