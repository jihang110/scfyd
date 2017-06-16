package com.ut.scf.reqbean.pub;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class ImDeleteReqBean extends BaseReqBean{

	/**
	 * 主键Id
	 */
	@NotBlank(message = "{notblank}")
	
	private String recUid;

	public String getRecUid() {
		return recUid;
	}

	public void setRecUid(String recUid) {
		this.recUid = recUid;
	}
	
	
}
