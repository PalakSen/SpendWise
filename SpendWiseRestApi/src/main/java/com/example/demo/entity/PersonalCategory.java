package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Entity
@Table(name = "personalcategory")
@JsonIgnoreProperties({"personalBudgets", "personalExpenditures"})
public class PersonalCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pcid")
    private int pcId;

    @Column(name = "cname", unique = true, nullable = false)
    private String cName;

    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "personalCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PersonalBudget> personalBudgets = new HashSet<>();

    @OneToMany(mappedBy = "personalCategory", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PersonalExpenditure> personalExpenditures = new HashSet<>();
}
