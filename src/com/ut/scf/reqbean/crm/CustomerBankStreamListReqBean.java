package com.ut.scf.reqbean.crm;

import com.ut.scf.reqbean.PageReqBean;

public class CustomerBankStreamListReqBean extends PageReqBean {
	
	/**
	 * 企业Id
	 */
	private String corpId;
	
	/**
	 * 年月
	 */
	private String operTime;

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getOperTime() {
		return operTime;
	}

	public void setOperTime(String operTime) {
		this.operTime = operTime;
	}
	
}
