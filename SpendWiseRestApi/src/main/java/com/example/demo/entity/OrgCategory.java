package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Entity
@Table(name = "orgcategory")
@JsonIgnoreProperties({"orgExpenditures"})
public class OrgCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orgcid")
    private int orgcId;

    @Column(name = "orgcname", unique = true, nullable = false)
    private String orgcName;

    @Column(name = "cdesc", nullable = false)
    private String cDesc;

    @OneToMany(mappedBy = "orgCategory", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("orgCategory")
    private Set<OrgExpenditure> orgExpenditures;
}
