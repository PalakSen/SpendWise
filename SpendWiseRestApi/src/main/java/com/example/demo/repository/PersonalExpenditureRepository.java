package com.example.demo.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.PersonalExpenditure;

import jakarta.transaction.Transactional;

public interface PersonalExpenditureRepository extends JpaRepository<PersonalExpenditure, Integer> {
	@Modifying
	@Query(value="select * from personalexpenditure where uid = :uid",nativeQuery = true)
	public List<PersonalExpenditure> expensesByUid(int uid);
	
	@Modifying
	@Transactional
	@Query(value="update personalexpenditure  set edesc = :edesc, edate = :edate, tid = :tid, amount = :amount WHERE exid = :exid",nativeQuery = true)
	public int updateExpensesByTxid(String edesc,Date edate,String tid,Double amount,int exid);
	
	@Query(value = "SELECT pcid, SUM(amount) AS totalAmount FROM personalexpenditure WHERE uid = :uid GROUP BY pcid ORDER BY pcid ASC",nativeQuery = true)
	public List<Object[]> findTotalAmountByPcidAndUid(int uid);
}
