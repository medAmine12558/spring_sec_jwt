package com.pfa5.evenement.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.pfa5.type_evenement_enumms.Type_Evenement_Enum;

@Entity
public class Evenement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String description;
    private Type_Evenement_Enum type;
    public Evenement(){}
    public Evenement(String description, Type_Evenement_Enum type) {
        this.description = description;
        this.type = type;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Type_Evenement_Enum getType() {
        return type;
    }
}
