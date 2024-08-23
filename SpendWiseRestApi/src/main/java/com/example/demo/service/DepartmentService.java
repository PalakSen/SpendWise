package com.example.demo.service;

import java.util.List;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.demoentity.DemoDepartment;
import com.example.demo.entity.Department;
import com.example.demo.entity.Login;
import com.example.demo.entity.Role;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.LoginRepository;
import com.example.demo.repository.OrganizationHeadRepository;

import jakarta.transaction.Transactional;
@Transactional
@Service
public class DepartmentService {
	
	@Autowired
	DepartmentRepository deptrepo;
	
	@Autowired
	OrganizationHeadRepository orgrepo;
	
	@Autowired
	LoginRepository lrepo;
	
	public List<Department> getAlldept(){
		return deptrepo.findAll();
	}
	
	public Department addDepartment(DemoDepartment dept) {
		 Role role = new Role();
	        role.setRoleId(dept.getRoleid());
	        Login login = new Login();
	        login.setUname(dept.getUname());
	        String hashed = BCrypt.hashpw(dept.getPwd(),BCrypt.gensalt(12));
	        login.setPwd(hashed);
	        login.setEmail(dept.getEmail());
	        login.setStatus(true);
	        login.setRole(role);
	        login.setFname(dept.getFname());
	        login.setLname(dept.getLname());
	        login.setContact(dept.getContact());
	        login.setCity(dept.getCity());
	        lrepo.save(login);
	        Department d= new Department();
	        d.setAllocatedamt(dept.getAloamt());
	        d.setRequestedamt(dept.getReqamt());
	        d.setUid(login);
	        d.setDeptname(dept.getDeptname());
	        d.setOrganizationHead(orgrepo.findById(dept.getOrgid()).get());
	        
		return deptrepo.save(d);
	}
	
	
	public Department getDepartment(int uid) {
		return deptrepo.getDeptIdOfParticularUser(uid);
	}
	
	public List<Department> getAllDeparmentOfParticularOrg(int id){
		return deptrepo.getAllDepartmentById(id);
	}
}
