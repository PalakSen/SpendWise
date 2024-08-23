package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.service.OrganizationHeadService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrganizationHeadController {

	@Autowired
	OrganizationHeadService orgheadservice;
	
//	public Department addDepartment() {
//		return 
//	}
	
	
}
