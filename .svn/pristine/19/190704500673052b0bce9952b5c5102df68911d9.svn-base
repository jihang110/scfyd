package com.ut.scf.reqbean.crm;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.reqbean.BaseReqBean;

public class AccountAnalyAddReqBean extends BaseReqBean{
	
	
	/**
	 * 企业Id
	 */
	@NotBlank(message = "{corp.corpId.notblank}")
	private String corpId;

	/**
	 * 买方名称
	 */
	private String buyerName;

	/**
	 * 合同编号
	 */
	private String contractId;

	/**
	 * 发票编号
	 */
	private String invoiceId;

	/**
	 * 发票金额
	 */
	private Double invoiceAmount;

	/**
	 * 开票日期
	 */
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private String invoiceTime;

	/**
	 * 预计付款日
	 */
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private String expectedPaymentTime;

	/**
	 * 预计付款日
	 */
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private String actualPaymentTime;

	/**
	 * 实际付款金额（元）
	 */
	private Double actualPaymentAmount;

	/**
	 * 是否已到期,0:否,1：是
	 */
	private Byte ifExpired;

	/**
	 * 是否已逾期,0:否,1：是
	 */
	private Byte ifOverdue;

	/**
	 * 逾期天数
	 */
	private Short overdueDays;

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getBuyerName() {
		return buyerName;
	}

	public void setBuyerName(String buyerName) {
		this.buyerName = buyerName;
	}

	public String getContractId() {
		return contractId;
	}

	public void setContractId(String contractId) {
		this.contractId = contractId;
	}

	public String getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(String invoiceId) {
		this.invoiceId = invoiceId;
	}

	public Double getInvoiceAmount() {
		return invoiceAmount;
	}

	public void setInvoiceAmount(Double invoiceAmount) {
		this.invoiceAmount = invoiceAmount;
	}

	public String getInvoiceTime() {
		return invoiceTime;
	}

	public void setInvoiceTime(String invoiceTime) {
		this.invoiceTime = invoiceTime;
	}

	public String getExpectedPaymentTime() {
		return expectedPaymentTime;
	}

	public void setExpectedPaymentTime(String expectedPaymentTime) {
		this.expectedPaymentTime = expectedPaymentTime;
	}

	public String getActualPaymentTime() {
		return actualPaymentTime;
	}

	public void setActualPaymentTime(String actualPaymentTime) {
		this.actualPaymentTime = actualPaymentTime;
	}

	public Double getActualPaymentAmount() {
		return actualPaymentAmount;
	}

	public void setActualPaymentAmount(Double actualPaymentAmount) {
		this.actualPaymentAmount = actualPaymentAmount;
	}

	public Byte getIfExpired() {
		return ifExpired;
	}

	public void setIfExpired(Byte ifExpired) {
		this.ifExpired = ifExpired;
	}

	public Byte getIfOverdue() {
		return ifOverdue;
	}

	public void setIfOverdue(Byte ifOverdue) {
		this.ifOverdue = ifOverdue;
	}

	public Short getOverdueDays() {
		return overdueDays;
	}

	public void setOverdueDays(Short overdueDays) {
		this.overdueDays = overdueDays;
	}
	
}
