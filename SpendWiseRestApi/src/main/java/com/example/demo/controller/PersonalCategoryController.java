package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.PersonalCategory;
import com.example.demo.service.PersonalCategoryService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PersonalCategoryController {
	
	@Autowired
	PersonalCategoryService pcservice;

	@GetMapping("/getAllCategory")
	public List<PersonalCategory> getAllCategory() {
		return pcservice.getAllCategory();
	}
}

