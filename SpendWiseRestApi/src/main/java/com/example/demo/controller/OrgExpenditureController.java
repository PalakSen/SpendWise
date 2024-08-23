package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.demoentity.DemoOrgExpense;
import com.example.demo.entity.OrgExpenditure;
import com.example.demo.service.OrgExpenditureService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrgExpenditureController {

	
	@Autowired
	OrgExpenditureService oservice;
	
	@PostMapping("/addOrgExpense")
	public OrgExpenditure addOrgExpenses(@RequestBody DemoOrgExpense demo) {
		return oservice.addOrgExpenses(demo);
	}
	
	@GetMapping("/getExpenseByDeptId/{id}")
	public List<OrgExpenditure> getExpenseByDeptiId(@PathVariable int id) {
		return  oservice.getExpenseByDeptiId(id);
	}
	
}
