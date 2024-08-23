package com.example.demo.entity;

import java.util.HashSet;
import java.util.Set;

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
@Table(name = "department")
@JsonIgnoreProperties({"organizationHead", "requests", "orgExpenditures"})
public class Department {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deptid")
    private int deptid;

    @Column(name = "deptname")
    private String deptname;

    @Column(name = "allocatedamt")
    private double allocatedamt;

    @Column(name = "requestedamt")
    private double requestedamt;

    @ManyToOne
    @JoinColumn(name = "orgid", nullable = false)
    @JsonIgnoreProperties("departments")
    private OrganizationHead organizationHead;
    
    @ManyToOne
    @JoinColumn(name = "uid", nullable = false)
    private Login uid;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private Set<Requests> requests = new HashSet<>();
    
}
