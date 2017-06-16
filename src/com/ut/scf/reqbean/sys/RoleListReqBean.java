package com.ut.scf.reqbean.sys;

import com.ut.scf.reqbean.PageReqBean;

public class RoleListReqBean extends PageReqBean {

	/**
	 * 角色名称
	 */
	private String roleName;

	/**
	 * 角色类型，关联表sys_type
	 */
	private Integer roleType;

	/**
	 * 企业Id
	 */
	private String corpId;

	/**
	 * 是否分页，0：否，1：是，默认为0.
	 */
	private Integer isPage = 0;

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Integer getRoleType() {
		return roleType;
	}

	public void setRoleType(Integer roleType) {
		this.roleType = roleType;
	}

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public Integer getIsPage() {
		return isPage;
	}

	public void setIsPage(Integer isPage) {
		this.isPage = isPage;
	}

}
