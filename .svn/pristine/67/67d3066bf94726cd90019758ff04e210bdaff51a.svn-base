package com.ut.scf.reqbean.sys;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.reqbean.BaseReqBean;

public class PhoneReqBean extends BaseReqBean {

	/**
	 * 手机号
	 */
	@NotBlank(message = "{login.phone.notblank}")
	@Pattern(regexp = ScfConsts.REGEX_MOBILE_PHONE, message = "{login.phone.notpattern}")
	private String phone;

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

}
