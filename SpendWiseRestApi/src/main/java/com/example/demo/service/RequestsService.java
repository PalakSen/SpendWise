package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.demoentity.DemoRequest;
import com.example.demo.entity.Requests;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.RequestsRepository;

@Service
public class RequestsService {

	@Autowired
	RequestsRepository reqrepo;
	
	@Autowired
	DepartmentRepository drepo;
	
	public List<Requests> getAllRequest(int id){
		return reqrepo.getPendingRequest(id);
	}
	
	public int rejectFunds(int id) {
		reqrepo.deleteById(id);
		return 1;
	}
	
	public Requests createRequest(DemoRequest r) {
		Requests rn= new Requests();
		rn.setDepartment(drepo.findById(r.getDeptid()).get());
		rn.setReqAmt(r.getAmt());
		rn.setReqDate(r.getDate());
		rn.setReqDesc(r.getDesc());
		rn.setReqStatus(r.getStatus());
		return reqrepo.save(rn);
	}

	public List<Requests> getAllRequestOrg(int id) {
		return reqrepo.getPendingRequestOrg(id);
	}
}
