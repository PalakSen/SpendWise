package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.demoentity.DemoFunds;
import com.example.demo.entity.OrgFunds;
import com.example.demo.service.OrgFundsService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrgFundsController {
	
	@Autowired
	OrgFundsService orgfundservice;
	
	@GetMapping("/getFundsById/{id}")
	public OrgFunds getFundsById(@PathVariable int id) {
		return orgfundservice.getOrgFundsById(id);
	}
	@CrossOrigin
	@PostMapping("/addFunds")
	public OrgFunds addFunds(@RequestBody DemoFunds funds) {
		return orgfundservice.addFunds(funds);
	}
	
	

}
