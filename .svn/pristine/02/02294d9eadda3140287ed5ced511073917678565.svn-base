package com.ut.scf.reqbean.finance;

import javax.validation.constraints.Pattern;

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.reqbean.BaseReqBean;

public class ReceiveAccountAddReqBean extends BaseReqBean {
	/**
	 * 所属企业id
	 */
	private String corpId;
	/**
	 * 合同编号
	 */
	private String contractNo;
	/**
	 * 发票编号
	 */
	private String invoiceNo;
	/**
	 * 票据类型(1:发票)
	 */
	private Byte invoiceType;
	/**
	 * 发票金额
	 */
	private Double invoiceAmount;
	/**
	 * 开票日期
	 */
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private String invoiceDate;
	/**
	 * 预计付款日期
	 */
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private String estimatedPayDate;
	/**
	 * 预计付款金额
	 */
	private Double estimatedPayAmount;
	/**
	 * 实际付款日期
	 */
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private String actualPayDate;
	/**
	 * 实际付款金额（元）
	 */
	private Double actualPayAmount;
	/**
	 * 是否逾期
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
	public String getContractNo() {
		return contractNo;
	}
	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}
	public String getInvoiceNo() {
		return invoiceNo;
	}
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}
	public Byte getInvoiceType() {
		return invoiceType;
	}
	public void setInvoiceType(Byte invoiceType) {
		this.invoiceType = invoiceType;
	}
	public Double getInvoiceAmount() {
		return invoiceAmount;
	}
	public void setInvoiceAmount(Double invoiceAmount) {
		this.invoiceAmount = invoiceAmount;
	}
	public String getInvoiceDate() {
		return invoiceDate;
	}
	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
	}
	public String getEstimatedPayDate() {
		return estimatedPayDate;
	}
	public void setEstimatedPayDate(String estimatedPayDate) {
		this.estimatedPayDate = estimatedPayDate;
	}
	public Double getEstimatedPayAmount() {
		return estimatedPayAmount;
	}
	public void setEstimatedPayAmount(Double estimatedPayAmount) {
		this.estimatedPayAmount = estimatedPayAmount;
	}
	public String getActualPayDate() {
		return actualPayDate;
	}
	public void setActualPayDate(String actualPayDate) {
		this.actualPayDate = actualPayDate;
	}
	public Double getActualPayAmount() {
		return actualPayAmount;
	}
	public void setActualPayAmount(Double actualPayAmount) {
		this.actualPayAmount = actualPayAmount;
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
