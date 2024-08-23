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
public class DemoOrgExpense {

	private String edesc;
	private Date edate;
	private String tid;
	private int deptid;
	private int orgcid;
	private double amount;
}
