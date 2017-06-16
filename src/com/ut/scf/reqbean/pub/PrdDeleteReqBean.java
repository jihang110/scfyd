package com.ut.scf.reqbean.pub;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class PrdDeleteReqBean extends BaseReqBean{
	
	/**
	 * 产品Id
	 */
	@NotBlank(message = "{notblank}")
	
	private String productId;

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

		
}
