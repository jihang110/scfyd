package com.ut.scf.reqbean.crm;

import com.ut.scf.reqbean.BaseReqBean;

public class NegativeInfoGetParamsReqBean extends BaseReqBean{
	
	private String operYear;
	private String corpId;
	public String getOperYear() {
		return operYear;
	}
	public void setOperYear(String operYear) {
		this.operYear = operYear;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
    
}