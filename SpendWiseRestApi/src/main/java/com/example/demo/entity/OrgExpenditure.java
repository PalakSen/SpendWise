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
@Table(name = "orgexpenditure")
public class OrgExpenditure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orgexid")
    private int orgexId;

    @Column(name = "expamt", nullable = false)
    private double expAmt;

    @Column(name = "exppurpose", nullable = false)
    private String expPurpose;

    @Column(name = "expdate", nullable = false)
    private Date expDate;

    @Column(name = "transactionid", unique = true, nullable = false)
    private String transactionId;

    @ManyToOne
    @JoinColumn(name = "orgcid", nullable = false)
    private OrgCategory orgCategory;

    @ManyToOne
    @JoinColumn(name = "deptid", nullable = false)
    private Department department;
}
