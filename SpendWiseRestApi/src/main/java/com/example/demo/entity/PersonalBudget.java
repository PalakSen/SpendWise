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
@Table(name = "personalbudget")
public class PersonalBudget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bid")
    private int bId;

    @ManyToOne
    @JoinColumn(name = "uid")
    private Login login;

    @ManyToOne
    @JoinColumn(name = "pcid")
    private PersonalCategory personalCategory;

    @Column(name = "bamount", nullable = false)
    private float bAmount;

    @Column(name = "startdate", nullable = false)
    private Date startDate;

    @Column(name = "enddate", nullable = false)
    private Date endDate;

   
}
