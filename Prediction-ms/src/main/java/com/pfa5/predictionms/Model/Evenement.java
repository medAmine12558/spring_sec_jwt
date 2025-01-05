package com.pfa5.predictionms.Model;
import com.pfa5.type_evenement_enumms.Type_Evenement_Enum;
import lombok.Data;

@Data
public class Evenement {
    private int id;
    private String disc;
    private Type_Evenement_Enum Type_Evenement;
}
