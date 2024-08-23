package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.demoentity.DemoRequest;
import com.example.demo.entity.Requests;
import com.example.demo.service.RequestsService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RequestsController {

	@Autowired
	RequestsService reqservice;
	
	@GetMapping("/getRequest/{id}")
	public List<Requests> getAllRequest(@PathVariable int id){
		return reqservice.getAllRequest(id);
	}
	
	@CrossOrigin
	@DeleteMapping("/reject/{id}")
	public int rejectRequestById(@PathVariable int id) {
		try {
			reqservice.rejectFunds(id);
		}catch(Exception e) {
			return 0;
		}
		return 1;
	}

	@PostMapping("/makereq")
	public Requests createRequest(@RequestBody DemoRequest req) {
		return reqservice.createRequest(req);
	}
	
	@GetMapping("/getRequestOrg/{id}")
	public List<Requests> getAllReqOrg(@PathVariable int id){
		return reqservice.getAllRequestOrg(id);
	}
}
