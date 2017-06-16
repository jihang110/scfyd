package com.ut.scf.reqbean.finance;

import java.math.BigDecimal;

import com.ut.scf.reqbean.BaseReqBean;

public class CorpAccountAddReqBean extends BaseReqBean{
	private String corpId;
	
	private int accountType;
	
	private int accountMark;

	private String account;
	
	private String accountName;
	
	private String currency;
	
	private String accountBank;
	
	private String bankLocation;
	
	private BigDecimal accountAmount;

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public int getAccountType() {
		return accountType;
	}

	public void setAccountType(int accountType) {
		this.accountType = accountType;
	}

	public int getAccountMark() {
		return accountMark;
	}

	public void setAccountMark(int accountMark) {
		this.accountMark = accountMark;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getAccountBank() {
		return accountBank;
	}

	public void setAccountBank(String accountBank) {
		this.accountBank = accountBank;
	}

	public String getBankLocation() {
		return bankLocation;
	}

	public void setBankLocation(String bankLocation) {
		this.bankLocation = bankLocation;
	}

	public BigDecimal getAccountAmount() {
		return accountAmount;
	}

	public void setAccountAmount(BigDecimal accountAmount) {
		this.accountAmount = accountAmount;
	}

	
	
}
