package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.OrganizationHeadRepository;

@Service
public class OrganizationHeadService {
	
	@Autowired
	OrganizationHeadRepository orgheadrepo;
	
	 
	
}
