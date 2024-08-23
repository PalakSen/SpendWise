package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.demoentity.DemoBudget;
import com.example.demo.entity.PersonalBudget;
import com.example.demo.repository.PersonalBudgetRepository;

@Service
public class PersonalBudgetService {

	@Autowired
	PersonalBudgetRepository pebudgetrepo;

	public int addPersonalBudget(DemoBudget dbudget) {
		return pebudgetrepo.addBudget(dbudget.getUid(), dbudget.getBamount(), dbudget.getPcid(),dbudget.getSdate(), dbudget.getEdate());
	}
	
	public List<PersonalBudget> getAllBudget(int id){
		return pebudgetrepo.getBudgetById(id);
	}
}
