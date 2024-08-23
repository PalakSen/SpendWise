package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.OrgFunds;

public interface OrgFundsRepository extends JpaRepository<OrgFunds, Integer> {

}
