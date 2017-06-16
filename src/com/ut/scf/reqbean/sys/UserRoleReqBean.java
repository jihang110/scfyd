package com.ut.scf.reqbean.sys;

import com.ut.scf.reqbean.BaseReqBean;

public class UserRoleReqBean extends BaseReqBean {
	private String roleId;
	private String userId;

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

}
