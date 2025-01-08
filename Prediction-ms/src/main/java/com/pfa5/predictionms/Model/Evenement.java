package com.pfa5.predictionms.Model;
import com.pfa5.type_evenement_enumms.Type_Evenement_Enum;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

@Data
public class Evenement {
    private Integer id;
    private String description;
    private Type_Evenement_Enum type;
    public Evenement(String description, Type_Evenement_Enum type) {
        this.description = description;
        this.type = type;
    }
}
