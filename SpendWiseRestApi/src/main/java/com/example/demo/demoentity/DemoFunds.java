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
public class DemoFunds {
	private double fundamt;
	private int deptid,orgidfk,reqid;
	private Date fstartdate,fenddate;

}
