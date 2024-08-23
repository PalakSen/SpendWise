package com.example.demo.entity;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Entity
@Table(name = "personalexpenditure")
@JsonIgnoreProperties({"login"}) // Ignore login field to prevent deep recursion
public class PersonalExpenditure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exid")
    private int exId;

    @Column(name = "edesc", nullable = false)
    private String eDesc;

    @Column(name = "edate", nullable = false)
    private Date eDate;

    @Column(name = "tid", unique = true, nullable = false)
    private String tId;
    
    @Column(name = "amount",nullable = false)
    private Double amount;

    @ManyToOne
    @JoinColumn(name = "uid")
    private Login login;

    @ManyToOne
    @JoinColumn(name = "pcid")
    @JsonIgnoreProperties("personalExpenditures") // Ignore personalExpenditures in PersonalCategory
    private PersonalCategory personalCategory;
}
