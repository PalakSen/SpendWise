package com.example.demo.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.PersonalBudget;

import jakarta.transaction.Transactional;

public interface PersonalBudgetRepository extends JpaRepository<PersonalBudget, Integer> {
	@Modifying
    @Transactional
    @Query(value="INSERT INTO personalbudget (uid, bamount,pcid, startdate, enddate) VALUES (:uid, :amt, :pcid , :sdate, :edate)", nativeQuery = true)
    public int addBudget(int uid, double amt, int pcid, Date sdate,Date edate);
	
	@Modifying
    @Transactional
    @Query(value="select * from personalbudget where uid = :uid", nativeQuery = true)
    public List<PersonalBudget> getBudgetById(int uid);
}
 