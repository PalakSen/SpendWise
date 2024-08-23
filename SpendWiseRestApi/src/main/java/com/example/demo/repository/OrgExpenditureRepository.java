package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.OrgExpenditure;

public interface OrgExpenditureRepository extends JpaRepository<OrgExpenditure, Integer> {

	@Modifying
	@Query(value  =" SELECT orgexid, expamt, exppurpose, expdate, transactionid, orgcid, deptid FROM orgexpenditure where deptid = :id",nativeQuery = true)
	public List<OrgExpenditure> getExpenseBYdeptId(int id);
}
