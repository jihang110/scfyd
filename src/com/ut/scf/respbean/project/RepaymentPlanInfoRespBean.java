package com.ut.scf.respbean.project;

import java.math.BigDecimal;
import java.util.Date;

public class RepaymentPlanInfoRespBean {
	private String orderId;

	private Byte period;

	private Date currentRepayDate;

	private BigDecimal currentPayablePrincipal;

	private BigDecimal currentPayableInterest;

	private String repayStatus;

	private String orderBatchId;

	private BigDecimal productAmt;

	private BigDecimal crReqAmt;

	private BigDecimal payM;

	private String name;

	private String idCard;

	private String contact;

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public Byte getPeriod() {
		return period;
	}

	public void setPeriod(Byte period) {
		this.period = period;
	}

	public Date getCurrentRepayDate() {
		return currentRepayDate;
	}

	public void setCurrentRepayDate(Date currentRepayDate) {
		this.currentRepayDate = currentRepayDate;
	}

	public BigDecimal getCurrentPayablePrincipal() {
		return currentPayablePrincipal;
	}

	public void setCurrentPayablePrincipal(BigDecimal currentPayablePrincipal) {
		this.currentPayablePrincipal = currentPayablePrincipal;
	}

	public BigDecimal getCurrentPayableInterest() {
		return currentPayableInterest;
	}

	public void setCurrentPayableInterest(BigDecimal currentPayableInterest) {
		this.currentPayableInterest = currentPayableInterest;
	}

	public String getRepayStatus() {
		return repayStatus;
	}

	public void setRepayStatus(String repayStatus) {
		this.repayStatus = repayStatus;
	}

	public String getOrderBatchId() {
		return orderBatchId;
	}

	public void setOrderBatchId(String orderBatchId) {
		this.orderBatchId = orderBatchId;
	}

	public BigDecimal getProductAmt() {
		return productAmt;
	}

	public void setProductAmt(BigDecimal productAmt) {
		this.productAmt = productAmt;
	}

	public BigDecimal getCrReqAmt() {
		return crReqAmt;
	}

	public void setCrReqAmt(BigDecimal crReqAmt) {
		this.crReqAmt = crReqAmt;
	}

	public BigDecimal getPayM() {
		return payM;
	}

	public void setPayM(BigDecimal payM) {
		this.payM = payM;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

}
