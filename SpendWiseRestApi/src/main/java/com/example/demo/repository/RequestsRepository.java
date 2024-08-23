package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Requests;

public interface RequestsRepository extends JpaRepository<Requests, Integer> {
	@Modifying
	@Query(value="SELECT r.reqid, r.reqamt, r.reqdate, r.reqdesc, r.reqstatus, d.deptid, d.deptname, d.allocatedamt, (SELECT SUM(reqamt) FROM requests WHERE deptid = d.deptid) AS requestedamt, oh.orgid, l.uid FROM requests r JOIN department d ON r.deptid = d.deptid JOIN organizationhead oh ON d.orgid = oh.orgid JOIN login l ON oh.uid = l.uid WHERE d.orgid = :id AND r.reqstatus = 0"
			+ " ",nativeQuery = true)
	public List<Requests> getPendingRequest(int id);
	
	@Modifying
	@Query(value="SELECT r.reqid, r.reqamt, r.reqdate, r.reqdesc, r.reqstatus, d.deptid, d.deptname, d.allocatedamt, (SELECT SUM(reqamt) FROM requests WHERE deptid = d.deptid) AS requestedamt, oh.orgid, l.uid FROM requests r JOIN department d ON r.deptid = d.deptid JOIN organizationhead oh ON d.orgid = oh.orgid JOIN login l ON oh.uid = l.uid WHERE d.orgid = :id AND r.reqstatus = 0"
			+ " ",nativeQuery = true)
	public List<Requests> getPendingRequestOrg(int id);
	
}
