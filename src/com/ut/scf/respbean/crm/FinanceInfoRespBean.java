package com.ut.scf.respbean.crm;

import java.math.BigDecimal;

import com.ut.scf.respbean.BaseRespBean;

public class FinanceInfoRespBean extends BaseRespBean{
	
	private String corpName;
	
	private String corpId;
	
	private Integer financingType;
	
	private String financingNote;
	
	private String financingInstitutions;
	
	private Integer loanType;
	
	private String loanDate;
	
	private BigDecimal loanAmount;
	
	private BigDecimal loanBalance;
	
	private String loanMaturityDate;
	
	private String gyarateeType;
	
	private String historyOfCooperation;

	public String getCorpName() {
		return corpName;
	}

	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}

	
	
	
	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public Integer getFinancingType() {
		return financingType;
	}

	public void setFinancingType(Integer financingType) {
		this.financingType = financingType;
	}

	public String getFinancingNote() {
		return financingNote;
	}

	public void setFinancingNote(String financingNote) {
		this.financingNote = financingNote;
	}

	public String getFinancingInstitutions() {
		return financingInstitutions;
	}

	public void setFinancingInstitutions(String financingInstitutions) {
		this.financingInstitutions = financingInstitutions;
	}

	public Integer getLoanType() {
		return loanType;
	}

	public void setLoanType(Integer loanType) {
		this.loanType = loanType;
	}

	public String getLoanDate() {
		return loanDate;
	}

	public void setLoanDate(String loanDate) {
		this.loanDate = loanDate;
	}

	public BigDecimal getLoanAmount() {
		return loanAmount;
	}

	public void setLoanAmount(BigDecimal loanAmount) {
		this.loanAmount = loanAmount;
	}

	public BigDecimal getLoanBalance() {
		return loanBalance;
	}

	public void setLoanBalance(BigDecimal loanBalance) {
		this.loanBalance = loanBalance;
	}

	public String getLoanMaturityDate() {
		return loanMaturityDate;
	}

	public void setLoanMaturityDate(String loanMaturityDate) {
		this.loanMaturityDate = loanMaturityDate;
	}

	public String getGyarateeType() {
		return gyarateeType;
	}

	public void setGyarateeType(String gyarateeType) {
		this.gyarateeType = gyarateeType;
	}

	public String getHistoryOfCooperation() {
		return historyOfCooperation;
	}

	public void setHistoryOfCooperation(String historyOfCooperation) {
		this.historyOfCooperation = historyOfCooperation;
	}
	
	
}
