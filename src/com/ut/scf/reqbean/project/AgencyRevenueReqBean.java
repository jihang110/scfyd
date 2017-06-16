package com.ut.scf.reqbean.project;

import java.math.BigDecimal;
import java.util.Date;

import com.ut.scf.reqbean.PageReqBean;

public class AgencyRevenueReqBean extends PageReqBean{
	private String corpId;
	private String corpName;
	private String orgnNum;
	private String financeId;
	private Date financeStartDate;
	private Date financeEndDate;
	private BigDecimal financeAmount;
	private BigDecimal payAmt;
	private BigDecimal interestSum;
	private BigDecimal thisInterest;
	private String repaymentId;
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getOrgnNum() {
		return orgnNum;
	}
	public void setOrgnNum(String orgnNum) {
		this.orgnNum = orgnNum;
	}
	public String getFinanceId() {
		return financeId;
	}
	public void setFinanceId(String financeId) {
		this.financeId = financeId;
	}
	public Date getFinanceStartDate() {
		return financeStartDate;
	}
	public void setFinanceStartDate(Date financeStartDate) {
		this.financeStartDate = financeStartDate;
	}
	public Date getFinanceEndDate() {
		return financeEndDate;
	}
	public void setFinanceEndDate(Date financeEndDate) {
		this.financeEndDate = financeEndDate;
	}
	public BigDecimal getFinanceAmount() {
		return financeAmount;
	}
	public void setFinanceAmount(BigDecimal financeAmount) {
		this.financeAmount = financeAmount;
	}
	public BigDecimal getPayAmt() {
		return payAmt;
	}
	public void setPayAmt(BigDecimal payAmt) {
		this.payAmt = payAmt;
	}
	public BigDecimal getInterestSum() {
		return interestSum;
	}
	public void setInterestSum(BigDecimal interestSum) {
		this.interestSum = interestSum;
	}
	public BigDecimal getThisInterest() {
		return thisInterest;
	}
	public void setThisInterest(BigDecimal thisInterest) {
		this.thisInterest = thisInterest;
	}
	public String getRepaymentId() {
		return repaymentId;
	}
	public void setRepaymentId(String repaymentId) {
		this.repaymentId = repaymentId;
	}
	
}
