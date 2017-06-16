package com.ut.scf.reqbean.crm;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class CustomerBankStreamStatisticReqBean extends BaseReqBean {

	/**
	 * 企业Id
	 */
	@NotBlank(message = "{corp.corpId.notblank}")
	private String corpId;

	/**
	 * 年月
	 */
	private String operTime;

	public String getOperTime() {
		return operTime;
	}

	public void setOperTime(String operTime) {
		this.operTime = operTime;
	}

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

}
