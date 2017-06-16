package com.ut.scf.reqbean.crm;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class SalesRiskAnalyUpdateReqBean extends BaseReqBean{
	@NotBlank(message = "{recUid.notblank}")
	private String recUid;
	
	private String salesRiskPoint;

	public String getRecUid() {
		return recUid;
	}

	public void setRecUid(String recUid) {
		this.recUid = recUid;
	}

	public String getSalesRiskPoint() {
		return salesRiskPoint;
	}

	public void setSalesRiskPoint(String salesRiskPoint) {
		this.salesRiskPoint = salesRiskPoint;
	}
	
	
}
