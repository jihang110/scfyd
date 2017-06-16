package com.ut.scf.pojo;

import java.math.BigDecimal;

import javax.validation.constraints.Pattern;

import com.ut.scf.core.dict.ScfConsts;

public class Invoice {
	
	private String recUid;
	private String projectName;
	private String invoiceUrl;
	private String invoiceNo;
	private BigDecimal invoiceAmt;
	private String contractNo;
	private String billUnit;
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private String invoiceDate;
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private String invoiceStartDate;
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	String invoiceEndDate;
	private String invoiceCurrency;
	private BigDecimal invoiceBalance;
	private String invoiceStatus;
	
	
	private String corpId;
	private String createUserId;
	
	
	
	
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}
	
	
	
	public String getRecUid() {
		return recUid;
	}
	public void setRecUid(String recUid) {
		this.recUid = recUid;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getInvoiceUrl() {
		return invoiceUrl;
	}
	public void setInvoiceUrl(String invoiceUrl) {
		this.invoiceUrl = invoiceUrl;
	}
	public String getInvoiceNo() {
		return invoiceNo;
	}
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}
	public BigDecimal getInvoiceAmt() {
		return invoiceAmt;
	}
	public void setInvoiceAmt(BigDecimal invoiceAmt) {
		this.invoiceAmt = invoiceAmt;
	}
	public String getContractNo() {
		return contractNo;
	}
	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}
	public String getBillUnit() {
		return billUnit;
	}
	public void setBillUnit(String billUnit) {
		this.billUnit = billUnit;
	}
	public String getInvoiceDate() {
		return invoiceDate;
	}
	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
	}
	public String getInvoiceStartDate() {
		return invoiceStartDate;
	}
	public void setInvoiceStartDate(String invoiceStartDate) {
		this.invoiceStartDate = invoiceStartDate;
	}
	public String getInvoiceEndDate() {
		return invoiceEndDate;
	}
	public void setInvoiceEndDate(String invoiceEndDate) {
		this.invoiceEndDate = invoiceEndDate;
	}
	public String getInvoiceCurrency() {
		return invoiceCurrency;
	}
	public void setInvoiceCurrency(String invoiceCurrency) {
		this.invoiceCurrency = invoiceCurrency;
	}
	public BigDecimal getInvoiceBalance() {
		return invoiceBalance;
	}
	public void setInvoiceBalance(BigDecimal invoiceBalance) {
		this.invoiceBalance = invoiceBalance;
	}
	public String getInvoiceStatus() {
		return invoiceStatus;
	}
	public void setInvoiceStatus(String invoiceStatus) {
		this.invoiceStatus = invoiceStatus;
	}

	
}
