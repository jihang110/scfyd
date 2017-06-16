package com.ut.scf.reqbean.pub;

import java.math.BigDecimal;

import com.ut.scf.reqbean.PageReqBean;

public class ImListReqBean extends PageReqBean{
	/**
	 * 产品Id
	 */
	private String productId;
	/**
	 * 产品名称
	 */
	private String productName;
	/**
	 * 扣息方式
	 */
	private byte bett;
	/**
	 * 扣费方式
	 */
	private byte deduct;
	/**
	 * 收息日
	 */
	private String receptionDate;
	/**
	 * 利率
	 */
	private BigDecimal interestRate;
	/**
	 * 费率
	 */
	private BigDecimal costRate;
	/**
	 * 利率标准
	 */
	private String interestRateStandard;
	/**
	 * dyk利率;
	 */
	private BigDecimal dykInterestRate;
	
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public byte getBett() {
		return bett;
	}
	public void setBett(byte bett) {
		this.bett = bett;
	}
	public byte getDeduct() {
		return deduct;
	}
	public void setDeduct(byte deduct) {
		this.deduct = deduct;
	}
	public String getReceptionDate() {
		return receptionDate;
	}
	public void setReceptionDate(String receptionDate) {
		this.receptionDate = receptionDate;
	}
	public BigDecimal getInterestRate() {
		return interestRate;
	}
	public void setInterestRate(BigDecimal interestRate) {
		this.interestRate = interestRate;
	}
	public BigDecimal getCostRate() {
		return costRate;
	}
	public void setCostRate(BigDecimal costRate) {
		this.costRate = costRate;
	}
	public String getInterestRateStandard() {
		return interestRateStandard;
	}
	public void setInterestRateStandard(String interestRateStandard) {
		this.interestRateStandard = interestRateStandard;
	}
	public BigDecimal getDykInterestRate() {
		return dykInterestRate;
	}
	public void setDykInterestRate(BigDecimal dykInterestRate) {
		this.dykInterestRate = dykInterestRate;
	}
	
	
}
