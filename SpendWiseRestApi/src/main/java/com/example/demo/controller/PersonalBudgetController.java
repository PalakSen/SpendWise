package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.demoentity.DemoBudget;
import com.example.demo.entity.PersonalBudget;
import com.example.demo.service.PersonalBudgetService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PersonalBudgetController {

	@Autowired
	PersonalBudgetService pbudgetservice;

	
	@PostMapping("/addBudget")
	public int addBudget(@RequestBody  DemoBudget dbudget) {
		return pbudgetservice.addPersonalBudget(dbudget);
	}
	
	@GetMapping("/getBudget/{uid}")
	public List<PersonalBudget> getAllBudgetById(@PathVariable int uid){
		return pbudgetservice.getAllBudget(uid);
	}
}
