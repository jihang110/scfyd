package com.ut.scf.reqbean.crm;

import org.hibernate.validator.constraints.NotBlank;

/**
 * 
 * @author changxin
 *
 */
public class FixedExpendAnalyAddReqBean {
	@NotBlank(message = "{corp.corpId.notblank}")
	private String corpId;
	private String generatRiskPointAnaly;
	private String startOperTime;
	private String endOperTime;

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getGeneratRiskPointAnaly() {
		return generatRiskPointAnaly;
	}

	public void setGeneratRiskPointAnaly(String generatRiskPointAnaly) {
		this.generatRiskPointAnaly = generatRiskPointAnaly;
	}

	public String getStartOperTime() {
		return startOperTime;
	}

	public void setStartOperTime(String startOperTime) {
		this.startOperTime = startOperTime;
	}

	public String getEndOperTime() {
		return endOperTime;
	}

	public void setEndOperTime(String endOperTime) {
		this.endOperTime = endOperTime;
	}

}
