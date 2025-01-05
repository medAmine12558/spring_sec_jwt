package com.pfa5.predictionms.Controller;
import com.pfa5.type_evenement_enumms.Type_Evenement_Enum;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pred")
public class PredictionController {
    @GetMapping("/test")
    public String test() {
        String e = Type_Evenement_Enum.Event1.getEvent();
        return e;
    }
}
