package com.ut.scf.reqbean.sys;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class UserLoginReqBean extends BaseReqBean {

	/**
	 * 用户名
	 */
	@NotBlank(message = "{login.username.notblank}")
	private String username;

	/**
	 * 密码
	 */
	@NotBlank(message = "{login.password.notblank}")
	private String password;

	/**
	 * 验证码
	 */
	@NotBlank(message = "{login.code.notblank}")
	private String code;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
