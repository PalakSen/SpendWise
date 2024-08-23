package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonBackReference;
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Entity
@Table(name = "login")
@JsonIgnoreProperties({"personalBudgets", "personalExpenditures", "organizationHead"})
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid")
    private int uid;

    @Column(name = "uname", unique = true, nullable = false)
    private String uname;

    @Column(name = "pwd", unique = true, nullable = false)
    private String pwd;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "status", nullable = false)
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "roleid", nullable = false)
    @JsonBackReference
    private Role role;

    @Column(name = "fname", nullable = false)
    private String fname;

    @Column(name = "lname", nullable = false)
    private String lname;

    @Column(name = "contact", unique = true, nullable = false)
    private String contact; 

    @Column(name = "city")
    private String city;

}
