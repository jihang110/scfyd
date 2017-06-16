package com.ut.scf.reqbean.crm;

import com.ut.scf.reqbean.PageReqBean;

/**
 * 
 * @author changxin
 *
 */
public class FinanceInfoListReqBean extends PageReqBean{
	private String corpId;
	
	private String financingInstitutions;
	
	
	private String financingType;


	public String getCorpId() {
		return corpId;
	}


	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}


	public String getFinancingInstitutions() {
		return financingInstitutions;
	}


	public void setFinancingInstitutions(String financingInstitutions) {
		this.financingInstitutions = financingInstitutions;
	}


	public String getFinancingType() {
		return financingType;
	}


	public void setFinancingType(String financingType) {
		this.financingType = financingType;
	}


	
	

}
