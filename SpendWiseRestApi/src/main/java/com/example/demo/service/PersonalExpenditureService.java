package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.demoentity.DemoExpense;
import com.example.demo.entity.Login;
import com.example.demo.entity.PersonalCategory;
import com.example.demo.entity.PersonalExpenditure;
import com.example.demo.repository.PersonalCategoryRepository;
import com.example.demo.repository.PersonalExpenditureRepository;

@Service
public class PersonalExpenditureService {
	
	@Autowired
	PersonalExpenditureRepository pexpenditurerepo;
	
	@Autowired
	LoginService lserivce;
	
	@Autowired 
	PersonalCategoryService pcservice;
	
	@Autowired
	PersonalCategoryRepository pcrepo;
	
	// GET EXPENSES OF PARTICULAR USER 
	public List<PersonalExpenditure> getExpenses(int uid){
		return pexpenditurerepo.expensesByUid(uid);
	}
	
	// GET EXPENSES OF PARTICULAR USER 
		public PersonalExpenditure getExpensesById(int txid){
			return pexpenditurerepo.findById(txid).get();
		}
	
	// GET ALL EXPENSES
	public List<PersonalExpenditure> getAllExpenses(){
		return pexpenditurerepo.findAll();
	}
	
	
	// ADD EXPENSE OF A SINGLE USER USING DUMMY ENTITY
	public PersonalExpenditure addPersonalExpense(DemoExpense dexpense) {
		Login user= new Login();
		user=lserivce.getUserByUid(dexpense.getUid());
		PersonalCategory pcategory=pcrepo.findById(dexpense.getPcid()).get();
		PersonalExpenditure pex=new PersonalExpenditure();
		pex.setLogin(user);
		pex.setEDate(dexpense.getEdate());
		pex.setEDesc(dexpense.getEdesc());
		pex.setPersonalCategory(pcategory);
		pex.setTId(dexpense.getTid());
		pex.setAmount(dexpense.getAmount());
		return pexpenditurerepo.save(pex);
	}
	
	//UPDATE THE EXPENSES 
	public int updateExpenses(DemoExpense dexpense) {
		if( pexpenditurerepo.updateExpensesByTxid(dexpense.getEdesc(), dexpense.getEdate(), dexpense.getTid(), dexpense.getAmount(), dexpense.getUid())>0) {
			return 1;
		}
		return 0;
	}
	
	//DELETE PARTICULAR EXPENSE
	public void deleteExpenses(int id) {
		pexpenditurerepo.deleteById(id);
	}
	
	
	
	//GET PERSONAL EXPENDITURE OF PARTICULAR USER OF PARTICULAR CATEGORY
	public List<Object[]> getCategoryTotal(int id){
		return pexpenditurerepo.findTotalAmountByPcidAndUid(id);
	}
}
