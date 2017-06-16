package com.ut.scf.reqbean.pub;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.PageReqBean;

public class GaranteeMoneyListReqBean extends PageReqBean{

	/**
	 * 产品Id
	 */
	@NotBlank(message = "{notblank}")
	private String productId;
	private String productName;
	private Double guaranteeMoneyRate;
	/**
	 * 是否分页，0：否，1：是，默认为1.
	 */
	private Integer isPage = 1;
	public Integer getIsPage() {
		return isPage;
	}
	public void setIsPage(Integer isPage) {
		this.isPage = isPage;
	}
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
	public Double getGuaranteeMoneyRate() {
		return guaranteeMoneyRate;
	}
	public void setGuaranteeMoneyRate(Double guaranteeMoneyRate) {
		this.guaranteeMoneyRate = guaranteeMoneyRate;
	}
}
