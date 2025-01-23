package com.pfa5.evenement.Entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.pfa5.type_evenement_enumms.Type_Evenement_Enum;

@Entity
public class Evenement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(nullable = true)
    private String description;
    private Type_Evenement_Enum type;

    public Evenement(){}


    public Evenement(Type_Evenement_Enum type) {
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
    public Evenement setDescription(String description) {
         this.description = description;
         return this;
    }
    public Type_Evenement_Enum getType() {
        return type;
    }

    public void setType(Type_Evenement_Enum type) {
        this.type = type;
    }
}
