package com.example.demo.entity;

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
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roleid")
    private int roleId;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    //@JsonManagedReference // Indicates that this is the parent side of the relationship
    private Set<Login> logins;

    // Other fields and methods
}
