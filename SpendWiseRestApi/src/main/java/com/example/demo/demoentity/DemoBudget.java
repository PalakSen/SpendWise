package com.example.demo.demoentity;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DemoBudget {

	private Date sdate;
	private Date edate;
	private int uid;
	private double bamount;
	private int pcid;
}