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
@Table(name = "requests")
public class Requests {   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reqid")
    private int reqId;

    @Column(name = "reqamt", nullable = false)
    private double reqAmt;

    @Column(name = "reqdate", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date reqDate;

    @Column(name = "reqdesc", nullable = false, length = 45)
    private String reqDesc;


    @Column(name = "reqstatus", nullable = false)
    private int reqStatus;

    
    
    @ManyToOne
    @JoinColumn(name = "deptid", nullable = false)
    private Department department;
    
    }
