package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.demoentity.DemoFunds;
import com.example.demo.entity.Department;
import com.example.demo.entity.OrgFunds;
import com.example.demo.entity.OrganizationHead;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.OrgFundsRepository;
import com.example.demo.repository.OrganizationHeadRepository;

import jakarta.transaction.Transactional;

@Service
public class OrgFundsService {
	
	@Autowired
	OrgFundsRepository orgfundsrepo;
	
	@Autowired
	DepartmentRepository drepo;
	
	@Autowired
	OrganizationHeadRepository orgrepo;

	public OrgFunds getOrgFundsById(int id) {
		return orgfundsrepo.findById(id).get();
	}
	
	@Transactional
	public OrgFunds addFunds(DemoFunds funds) {
		Department dept= drepo.findById(funds.getDeptid()).get();
		dept.setRequestedamt(funds.getFundamt());
		OrganizationHead org= orgrepo.findById(funds.getOrgidfk()).get();
		OrgFunds orgfunds= new OrgFunds();
		orgfunds.setDepartment(dept);
		orgfunds.setOrganizationHead(org);
		orgfunds.setFStartDate(funds.getFstartdate());
		orgfunds.setFEndDate(funds.getFenddate());
		orgfunds.setFundAmt(funds.getFundamt());
		int n=drepo.updateRequestAfterAccepted(funds.getReqid());
		n=n+n;
		return orgfundsrepo.save(orgfunds);
	}
	
	
}
