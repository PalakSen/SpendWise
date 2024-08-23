package com.example.demo.entity;

import java.sql.Date;
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
@Table(name = "orgfunds")
public class OrgFunds {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fundid")
    private int fundId;

    @Column(name = "fundamt", nullable = false)
    private double fundAmt;

    @ManyToOne
    @JoinColumn(name = "deptid")
    private Department department;

    @Column(name = "fstartdate", nullable = false)
    private Date fStartDate;

    @Column(name = "fenddate", nullable = false)
    private Date fEndDate;

    @ManyToOne
    @JoinColumn(name = "orgidfk", nullable = false)
    private OrganizationHead organizationHead;

}
