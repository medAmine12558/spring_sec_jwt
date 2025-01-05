package com.pfa5.testms.Model;

import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class Roles {
    private Integer id;
    private String role;
}
