package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

	@Modifying
	@Query(value="update requests set reqstatus = 1 where reqid = :reqid",nativeQuery = true)
	public int updateRequestAfterAccepted(int reqid);
	
	@Query(value="select * from department where uid = :uid ",nativeQuery = true)
	public Department getDeptIdOfParticularUser(int uid);
	
	@Query(value="select * from department where orgid= :orgid",nativeQuery = true)
	public List<Department> getAllDepartmentById(int orgid);
}
