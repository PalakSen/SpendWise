package com.example.demo.entity;

import java.util.HashSet;
import java.util.Set;

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
@Table(name = "organizationhead")
public class OrganizationHead {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orgid")
    private int orgid;

    @Column(name = "orgname")
    private String orgname;

    @Column(name = "orgaddress")
    private String orgaddress;

    @Column(name = "industry")
    private String industry;

    @Column(name = "orgwebsite")
    private String orgwebsite;

    @Column(name = "orgdesc")
    private String orgdesc;

    @OneToMany(mappedBy = "organizationHead", cascade = CascadeType.ALL)
    private Set<Department> departments = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "uid")
    private Login login;
   
}
