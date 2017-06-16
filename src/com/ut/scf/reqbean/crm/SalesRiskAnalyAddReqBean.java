package com.ut.scf.reqbean.crm;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class SalesRiskAnalyAddReqBean extends BaseReqBean{
	@NotBlank(message = "{corp.corpId.notblank}")
    private String corpId;

    private String salesRiskPoint;

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getSalesRiskPoint() {
		return salesRiskPoint;
	}

	public void setSalesRiskPoint(String salesRiskPoint) {
		this.salesRiskPoint = salesRiskPoint;
	}
    
    

}
