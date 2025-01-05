package com.pfa5.predictionms.Model;


import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class User {

    private Integer id;

    private String fullName;

    private String email;

    private String password;

    private List<Roles> roles=new ArrayList<>();
}
