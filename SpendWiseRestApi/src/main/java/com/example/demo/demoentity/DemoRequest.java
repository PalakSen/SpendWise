package com.example.demo.demoentity;
import java.sql.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DemoRequest {

	double amt;
	Date date;
	String desc;
	int deptid,status;
	
}
