package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.OrgCategory;
import com.example.demo.repository.OrgCategoryRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrgCategoryController {
	
	@Autowired
	OrgCategoryRepository orepo;
	
	@GetMapping("/getorgcategory")
	public List<OrgCategory> getAllCategory(){
		return orepo.findAll();
	}

}
