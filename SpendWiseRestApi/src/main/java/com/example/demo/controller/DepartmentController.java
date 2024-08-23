package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.demoentity.DemoDepartment;
import com.example.demo.entity.Department;
import com.example.demo.service.DepartmentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DepartmentController {

	
	@Autowired
	DepartmentService deptservice;
	
	
	@PostMapping("/addDept")
	public Department addDepartment(@RequestBody DemoDepartment dept) {
		return deptservice.addDepartment(dept);
	}
	
	@GetMapping("/getdeptid/{uid}")
	public Department getDepartmentByUid(@PathVariable int uid) {
		return deptservice.getDepartment(uid);
	}
	
	@GetMapping("/getDepartmnet/{orgid}")
	public List<Department> getAllDepartmentById(@PathVariable int orgid){
		return deptservice.getAllDeparmentOfParticularOrg(orgid);
	}
	
}
