package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Department;
import com.example.demo.entity.Login;
import com.example.demo.service.DepartmentService;
import com.example.demo.service.LoginService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
	
	@Autowired
	LoginService loginservice;
	
	@Autowired
	DepartmentService deptservice;
	

	@GetMapping("/getLogin")
	public List<Login> getLogins(){
		return loginservice.getAllLogin();
	}
	
	@GetMapping("/getdept")
	public List<Department> alldept(){
		return deptservice.getAlldept();
	}
	

	
	@PutMapping("/updatesingleuser/{uid}")
		public ResponseEntity<Login> updateSingleUserDetails(@PathVariable int uid,@RequestBody  Login singleuserdetails) {
	        Login updateProfile = loginservice.updateUserProfile(uid, singleuserdetails);
	        return ResponseEntity.ok(updateProfile);
	}
}
