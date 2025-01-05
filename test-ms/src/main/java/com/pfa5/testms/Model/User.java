package com.pfa5.testms.Model;

import jakarta.persistence.*;
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
