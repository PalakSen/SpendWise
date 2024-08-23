package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.demoentity.DemoEntity;
import com.example.demo.demoentity.DemoExpense;
import com.example.demo.entity.PersonalExpenditure;
import com.example.demo.service.PersonalExpenditureService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PersonalExpenditureController {

	@Autowired
	PersonalExpenditureService pexpendservice;
	
	@PostMapping("/getExpense")
	public List<PersonalExpenditure> getAllExpensesByUid(@RequestBody DemoEntity demo){
		return pexpendservice.getExpenses(demo.getUid());
	}
	
	@PostMapping("/addExpense")
	public PersonalExpenditure addExpense(@RequestBody DemoExpense demoexpen) {
		return pexpendservice.addPersonalExpense(demoexpen);
	}
	
	@GetMapping("/getExpense/{transactionid}")
	public List<PersonalExpenditure> getExpensesById(@PathVariable int transactionid) {
		return pexpendservice.getExpenses(transactionid);
	}
	
	@GetMapping("/getExpenseById/{transactionid}")
	public PersonalExpenditure getExpensesByUserId(@PathVariable int transactionid) {
		return pexpendservice.getExpensesById(transactionid);
	}
	
	@GetMapping("/getall")
	public List<PersonalExpenditure> getMethodName() {
		return pexpendservice.getAllExpenses();
	}
	
	@PutMapping("/updateExpense")
	public int updateExpenseById(@RequestBody DemoExpense demoexpen) {
		return pexpendservice.updateExpenses(demoexpen);
	}
	
	@DeleteMapping("/deleteExpense")
	public int deleteExpensesParticular(@RequestBody DemoEntity id) {
		pexpendservice.deleteExpenses(id.getUid());
		return 1;
	}
	
	@GetMapping("/getRemainAmount/{uid}")
	public List<Object[]> getExpebyremainamount(@PathVariable int uid){
		return pexpendservice.getCategoryTotal(uid);
	}
}
