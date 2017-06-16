package com.ut.scf.reqbean.crm;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class CorpContrastAnalysisListReqBean extends BaseReqBean{

	@NotBlank(message = "{corp.corpId.notblank}")
	private String corpId;

	@NotBlank(message = "{year.notblank}")
	private String operYear;
	
	

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
