 package com.example.demo.service;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.demoentity.DemoUpdate;
import com.example.demo.entity.Login;
import com.example.demo.repository.LoginRepository;

@Service
public class LoginService {

	@Autowired
	LoginRepository loginrepo;
	
	public List<Login> getAllLogin(){
		return loginrepo.findAll();
	}
	
	public Login getUserByUid(int uid) {
		return loginrepo.findById(uid).get();
	}
	
	public Login updateUserProfile(int uid, Login singleuserdetails) {
		 Login singleuser = loginrepo.findById(uid).get();
		 
		 singleuser.setUname(singleuserdetails.getUname());
		 singleuser.setEmail(singleuserdetails.getEmail());
		 singleuser.setFname(singleuserdetails.getFname());
		 singleuser.setLname(singleuserdetails.getLname());
		 singleuser.setContact(singleuserdetails.getContact());
		 singleuser.setCity(singleuserdetails.getCity());
		 String hashed = BCrypt.hashpw(singleuserdetails.getPwd(),BCrypt.gensalt(12));
		 singleuser.setPwd(hashed);
		 
		 return loginrepo.save(singleuser);		
	}
	
	public Login updateSingleUser(DemoUpdate d) {
		Login l = loginrepo.findById(d.getId()).get();
		l.setCity(d.getCity());
		l.setContact(d.getContact());
		l.setEmail(d.getEmail());
		l.setFname(d.getFname());
		l.setLname(d.getLname());
		String hashed = BCrypt.hashpw(d.getPwd(),BCrypt.gensalt(12));
		l.setPwd(hashed);
		l.setUname(d.getUname());
		return loginrepo.save(l);
	}
	
	
}
