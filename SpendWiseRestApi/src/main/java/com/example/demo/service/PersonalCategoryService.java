package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.PersonalCategory;
import com.example.demo.repository.PersonalCategoryRepository;

@Service
public class PersonalCategoryService {

	@Autowired
	PersonalCategoryRepository pcrepo;
	
	public PersonalCategory getCategoryById(int pcid) {
		return pcrepo.findById(pcid).get();
	}
	
	public List<PersonalCategory> getAllCategory() {
		return pcrepo.findAll();
	}
}
