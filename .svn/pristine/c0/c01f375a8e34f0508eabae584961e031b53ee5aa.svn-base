package com.ut.scf.reqbean.crm;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class CustomerBankStreamAddReqBean extends BaseReqBean {

	/**
	 * 企业Id
	 */
	@NotBlank(message = "{corp.corpId.notblank}")
	private String corpId;
	
	private String bankName;
	
	/**
	 * 银行账号
	 */
	private String bankAccount;
	
	/**
	 * 月份
	 */
	private String operTime;
	
	/**
	 * 账户金额
	 */
	private Double amount;

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getBankAccount() {
		return bankAccount;
	}

	public void setBankAccount(String bankAccount) {
		this.bankAccount = bankAccount;
	}

	public String getOperTime() {
		return operTime;
	}

	public void setOperTime(String operTime) {
		this.operTime = operTime;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

}
