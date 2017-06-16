package com.ut.scf.reqbean.crm;


import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class CustomerTradeUpdateReqBean extends BaseReqBean{
	/**
	 * 记录Id,主键
	 */
	@NotBlank(message = "{recUid.notblank}")
	private String recUid;
	/**
	 * 客户名称
	 */
	private String customerName;
	/**
	 * 主要产品
	 */
	private String products;
	/**
	 * 年月
	 */
	private String operTime;
	/**
	 * 当月销售额
	 */
	private Double currentSales;
	/**
	 * 当月回款
	 */
	private Double currentPayment;
	/**
	 * 应收余额
	 */
	private Double receivableBalance;
	/**
	 * 当月合同回款
	 */
	private Double currentAgreementPayment;
	/**
	 * 当月实际回款差异
	 */
	private Double currentRealPayment;
	/**
	 * 发票金额
	 */
	private Double loanAmount;
	/**
	 * 回款比例,单位%
	 */
	private Double paymentScale;
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
     * 客户财务电话
     */
    private String financialPhone;
	public String getRecUid() {
		return recUid;
	}
	public void setRecUid(String recUid) {
		this.recUid = recUid;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getProducts() {
		return products;
	}
	public void setProducts(String products) {
		this.products = products;
	}
	public String getOperTime() {
		return operTime;
	}
	public void setOperTime(String operTime) {
		this.operTime = operTime;
	}
	public Double getCurrentSales() {
		return currentSales;
	}
	public void setCurrentSales(Double currentSales) {
		this.currentSales = currentSales;
	}
	public Double getCurrentPayment() {
		return currentPayment;
	}
	public void setCurrentPayment(Double currentPayment) {
		this.currentPayment = currentPayment;
	}
	public Double getReceivableBalance() {
		return receivableBalance;
	}
	public void setReceivableBalance(Double receivableBalance) {
		this.receivableBalance = receivableBalance;
	}
	public Double getCurrentAgreementPayment() {
		return currentAgreementPayment;
	}
	public void setCurrentAgreementPayment(Double currentAgreementPayment) {
		this.currentAgreementPayment = currentAgreementPayment;
	}
	public Double getCurrentRealPayment() {
		return currentRealPayment;
	}
	public void setCurrentRealPayment(Double currentRealPayment) {
		this.currentRealPayment = currentRealPayment;
	}
	public Double getLoanAmount() {
		return loanAmount;
	}
	public void setLoanAmount(Double loanAmount) {
		this.loanAmount = loanAmount;
	}
	public Double getPaymentScale() {
		return paymentScale;
	}
	public void setPaymentScale(Double paymentScale) {
		this.paymentScale = paymentScale;
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
