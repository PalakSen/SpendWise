package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.demoentity.DemoOrgExpense;
import com.example.demo.entity.Department;
import com.example.demo.entity.OrgCategory;
import com.example.demo.entity.OrgExpenditure;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.OrgCategoryRepository;
import com.example.demo.repository.OrgExpenditureRepository;

@Service
public class OrgExpenditureService {
	
	@Autowired
	OrgExpenditureRepository orgrepo;
	
	@Autowired
	DepartmentRepository drepo;
	
	@Autowired
	OrgCategoryRepository categoryrepo;
	
	public OrgExpenditure addOrgExpenses(DemoOrgExpense exp) {
		Department dept = drepo.findById(exp.getDeptid()).get();
		OrgCategory category = categoryrepo.findById(exp.getOrgcid()).get();
		OrgExpenditure expense =  new OrgExpenditure();
		expense.setDepartment(dept);
		expense.setOrgCategory(category);
		expense.setExpAmt(exp.getAmount());
		expense.setExpDate(exp.getEdate());
		expense.setExpPurpose(exp.getEdesc());
		expense.setTransactionId(exp.getTid());
		return orgrepo.save(expense);
	}
	
	public List<OrgExpenditure> getExpenseByDeptiId(int id) {
		return orgrepo.getExpenseBYdeptId(id);
	}

}
