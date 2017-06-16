package com.ut.scf.reqbean.pub;

import java.math.BigDecimal;
import java.util.Date;

import com.ut.scf.reqbean.PageReqBean;

public class ContractLoanInfoReqBean  extends PageReqBean{
	private String contractNo;
	private String orderBatchId;
	private BigDecimal recOrderAmt;
	private BigDecimal crReqTotalAmt;
	private Date currentRepayDate;
	public String getContractNo() {
		return contractNo;
	}
	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}
	public String getOrderBatchId() {
		return orderBatchId;
	}
	public void setOrderBatchId(String orderBatchId) {
		this.orderBatchId = orderBatchId;
	}
	public BigDecimal getRecOrderAmt() {
		return recOrderAmt;
	}
	public void setRecOrderAmt(BigDecimal recOrderAmt) {
		this.recOrderAmt = recOrderAmt;
	}
	public BigDecimal getCrReqTotalAmt() {
		return crReqTotalAmt;
	}
	public void setCrReqTotalAmt(BigDecimal crReqTotalAmt) {
		this.crReqTotalAmt = crReqTotalAmt;
	}
	public Date getCurrentRepayDate() {
		return currentRepayDate;
	}
	public void setCurrentRepayDate(Date currentRepayDate) {
		this.currentRepayDate = currentRepayDate;
	}
}
