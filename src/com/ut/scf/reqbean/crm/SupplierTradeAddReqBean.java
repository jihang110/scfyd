package com.ut.scf.reqbean.crm;


import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class SupplierTradeAddReqBean extends BaseReqBean{
	/**
	 * 保理商名称
	 */
	private String supplierName;
	/**
	 * 采购产品
	 */
	private String products;
	/**
	 * 企业Id
	 */
	@NotBlank(message = "{corp.corpId.notblank}")
	private String corpId;
	/**
	 * 年月
	 */
	private String operTime;
	/**
	 * 当月采购
	 */
	private Double currentBuy;
	/**
	 * 当月付款
	 */
	private Double currentPay;
	/**
	 * 余额
	 */
	private Double balance;
    /**
     * 账期和结算方式
     */
    private String accountAndSettlement;
    /**
     * 上半年交易额（万）
     */
    private Double firstHalfTransaction;
    /**
     * 占全年总采购额
     */
    private Double totalAnnualPurchases;
    /**
     * 供应商财务电话
     */
    private String financialPhone;
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	public String getProducts() {
		return products;
	}
	public void setProducts(String products) {
		this.products = products;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getOperTime() {
		return operTime;
	}
	public void setOperTime(String operTime) {
		this.operTime = operTime;
	}
	public Double getCurrentBuy() {
		return currentBuy;
	}
	public void setCurrentBuy(Double currentBuy) {
		this.currentBuy = currentBuy;
	}
	public Double getCurrentPay() {
		return currentPay;
	}
	public void setCurrentPay(Double currentPay) {
		this.currentPay = currentPay;
	}
	public Double getBalance() {
		return balance;
	}
	public void setBalance(Double balance) {
		this.balance = balance;
	}
	public String getAccountAndSettlement() {
		return accountAndSettlement;
	}
	public void setAccountAndSettlement(String accountAndSettlement) {
		this.accountAndSettlement = accountAndSettlement;
	}
	public Double getFirstHalfTransaction() {
		return firstHalfTransaction;
	}
	public void setFirstHalfTransaction(Double firstHalfTransaction) {
		this.firstHalfTransaction = firstHalfTransaction;
	}
	public Double getTotalAnnualPurchases() {
		return totalAnnualPurchases;
	}
	public void setTotalAnnualPurchases(Double totalAnnualPurchases) {
		this.totalAnnualPurchases = totalAnnualPurchases;
	}
	public String getFinancialPhone() {
		return financialPhone;
	}
	public void setFinancialPhone(String financialPhone) {
		this.financialPhone = financialPhone;
	}
    
	
}
