package com.ut.scf.reqbean.project;

import java.math.BigDecimal;
import java.util.Date;

public class RevenueUpdateReqBean {
	private String repaymentId;
	private Date repaymentDate;
	private BigDecimal repaySumAmt;
	private BigDecimal repayCapitalAmt;
	private BigDecimal repayInterestAmt;
	private BigDecimal revenueStartDate;
	private BigDecimal actRepayAmt;
	private byte repaymentType;
	public String getRepaymentId() {
		return repaymentId;
	}
	public void setRepaymentId(String repaymentId) {
		this.repaymentId = repaymentId;
	}
	public Date getRepaymentDate() {
		return repaymentDate;
	}
	public void setRepaymentDate(Date repaymentDate) {
		this.repaymentDate = repaymentDate;
	}
	public BigDecimal getRepaySumAmt() {
		return repaySumAmt;
	}
	public void setRepaySumAmt(BigDecimal repaySumAmt) {
		this.repaySumAmt = repaySumAmt;
	}
	public BigDecimal getRepayCapitalAmt() {
		return repayCapitalAmt;
	}
	public void setRepayCapitalAmt(BigDecimal repayCapitalAmt) {
		this.repayCapitalAmt = repayCapitalAmt;
	}
	public BigDecimal getRepayInterestAmt() {
		return repayInterestAmt;
	}
	public void setRepayInterestAmt(BigDecimal repayInterestAmt) {
		this.repayInterestAmt = repayInterestAmt;
	}
	public BigDecimal getRevenueStartDate() {
		return revenueStartDate;
	}
	public void setRevenueStartDate(BigDecimal revenueStartDate) {
		this.revenueStartDate = revenueStartDate;
	}
	public BigDecimal getActRepayAmt() {
		return actRepayAmt;
	}
	public void setActRepayAmt(BigDecimal actRepayAmt) {
		this.actRepayAmt = actRepayAmt;
	}
	public byte getRepaymentType() {
		return repaymentType;
	}
	public void setRepaymentType(byte repaymentType) {
		this.repaymentType = repaymentType;
	}
}
